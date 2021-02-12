import { UserDto } from 'api/types/users';

export interface ChatFormValues {
  chatName: string;
  members: UserDto[];
}