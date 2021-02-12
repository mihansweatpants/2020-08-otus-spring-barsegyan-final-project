import HttpApi from './HttpApi';

import { ChatDto, ChatMessageDto, CreateChatDto, UpdateChatDto } from 'api/types/chats';
import { PaginationRequestParams } from 'api/types/base/request';
import { PaginationResponse } from './types/base/response';

class ChatsApi extends HttpApi {
  getAllUserChats = () => {
    return this.get<ChatDto[]>('/');
  };

  createChat = (data: CreateChatDto) => {
    return this.post<ChatDto>('/', data);
  };

  updateChat = (chatId: string, data: UpdateChatDto) => {
    return this.patch<ChatDto>(`/${chatId}`, data);
  };

  addMembers = (chatId: string, userIds: string[]) => {
    return this.post<ChatDto>(`/${chatId}`, userIds);
  };

  removeMembers = (chatId: string, userIds: string[]) => {
    return this.post<ChatDto>(`/${chatId}`, userIds);
  };

  getChatMessages = (chatId: string, params: PaginationRequestParams) => {
    return this.get<PaginationResponse<ChatMessageDto>>(`/${chatId}/messages`, { params });
  };

  addMessageToChat = (chatId: string, text: string) => {
    return this.post<void>(`/${chatId}/messages`, { text });
  };
}

export default new ChatsApi('/api/chats');
