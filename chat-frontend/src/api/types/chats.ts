import { UserDto } from './users';

export interface ChatDto {
  id: string;
  name: string;
  lastMessage: ChatMessageDto | null;
  members: UserDto[];
}

export interface ChatMessageDto {
  id: string;
  chatId: string;
  sentAt: string;
  sentBy: UserDto;
  text: string;
}

export interface CreateChatDto {
  chatName: string;
  memberIds: string[];
}

export interface UpdateChatDto {
  chatName: string;
}
