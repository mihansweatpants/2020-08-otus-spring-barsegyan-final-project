import HttpApi from './HttpApi';

import { SearchUsersRequestParams, UserDto } from 'api/types/users';
import { PaginationResponse } from 'api/types/base/response';

class UsersApi extends HttpApi {
  getCurrentUser = () => {
    return this.get<UserDto>('/me');
  };

  searchUsers = (params: SearchUsersRequestParams) => {
    return this.get<PaginationResponse<UserDto>>('/search', { params });
  };
}

export default new UsersApi('/api/users');
