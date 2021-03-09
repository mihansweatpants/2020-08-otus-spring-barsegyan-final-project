import HttpApi from './HttpApi';

import { SessionDto } from 'api/types/sessions';

class SessionsApi extends HttpApi {
  getUserSessions = () => {
    return this.get<SessionDto[]>('/');
  };

  logoutCurrent = () => {
    return this.post<void>('/logout');
  };

  logoutAll = (sessionIds: string[]) => {
    return this.post<void>('/logout-all', { sessionIds })
  };
}

export default new SessionsApi('/api/sessions');
