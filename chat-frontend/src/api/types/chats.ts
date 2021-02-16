import { UserDto } from './users';

export interface ChatDto {
  id: string;
  name: string;
  lastMessage: ChatMessageDto | null;
  members: UserDto[];
}

export enum ChatMessageType {
  USER_MESSAGE = 'USER_MESSAGE',
  SERVICE_MESSAGE = 'SERVICE_MESSAGE',
}

export interface ChatMessageDto {
  id: string;
  chatId: string;
  sentAt: string;
  sentBy: UserDto | null;
  text: string;
  type: ChatMessageType;
}

export interface CreateChatDto {
  chatName: string;
  memberIds: string[];
}

export interface UpdateChatDto {
  chatName: string;
}
