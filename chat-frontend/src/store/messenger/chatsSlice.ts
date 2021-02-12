import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatsApi } from 'api';
import { ChatDto, ChatMessageDto, CreateChatDto } from 'api/types/chats';

import { AppThunk } from 'store';
import { fetchReadMarks } from 'store/messenger/readMarksSlice';

interface State {
  chatsList: ChatDto[];
  isLoading: boolean;
  selectedChat: ChatDto | null;
}

const initialState: State = {
  chatsList: [],
  isLoading: false,
  selectedChat: null,
};

const chats = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsListLoading(state) {
      state.isLoading = true;
    },

    setChatsListLoaded(state) {
      state.isLoading = false;
    },

    setChatsList(state, { payload }: PayloadAction<ChatDto[]>) {
      state.chatsList = sortByLastSentMessage(payload);
    },

    setSelectedChat(state, { payload }: PayloadAction<ChatDto>) {
      state.selectedChat = payload;
    },

    updateChatsListWithNewMessage(state, { payload: newMessage }: PayloadAction<ChatMessageDto>) {
      const updatedChatsList = state.chatsList
          .map(chat => newMessage.chatId === chat.id ? ({ ...chat, lastMessage: newMessage }) : chat);

      const sortedChatsList = sortByLastSentMessage(updatedChatsList);

      state.chatsList = sortedChatsList;
    },
  },
});

const sortByLastSentMessage = (chats: ChatDto[]) =>
  chats.sort(
    (prev, next) =>
      new Date(next.lastMessage?.sentAt ?? 0).getTime() -
      new Date(prev.lastMessage?.sentAt ?? 0).getTime()
  );

export const {
  setChatsList,
  setSelectedChat,
  setChatsListLoading,
  setChatsListLoaded,
  updateChatsListWithNewMessage,
} = chats.actions;

export default chats.reducer;

export const fetchChats = (): AppThunk => async (dispatch) => {
  dispatch(setChatsListLoading());

  const chats = await ChatsApi.getAllUserChats();
  dispatch(setChatsList(chats));

  dispatch(setChatsListLoaded());
};

export const createChat = (data: CreateChatDto): AppThunk => async (dispatch, getState) => {
  const newChat = await ChatsApi.createChat(data);

  const existingChats = getState().chats.chatsList;

  await dispatch(fetchReadMarks());

  dispatch(setChatsList([newChat, ...existingChats]));
  dispatch(setSelectedChat(newChat));
};
