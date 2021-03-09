export enum StompMessageType {
  NEW_CHAT_MESSAGE = 'NEW_MESSAGE',
}

export interface StompMessage<T = any> {
  type: StompMessageType,
  payload: T;
}