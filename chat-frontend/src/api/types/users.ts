import { PaginationRequestParams } from "./base/request";

export interface UserDto {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  isOnline: boolean;
}

export interface SearchUsersRequestParams extends PaginationRequestParams {
  searchText: string;
}
