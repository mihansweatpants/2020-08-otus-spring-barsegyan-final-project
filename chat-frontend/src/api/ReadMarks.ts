import HttpApi from './HttpApi';

import { ReadMarkDto } from 'api/types/readMarks';

class ReadMarksApi extends HttpApi {
  getUserReadMarks = () => {
    return this.get<ReadMarkDto[]>('/');
  };

  markLastReadMessage = (markId: string, messageId: string) => {
    return this.post<ReadMarkDto>(`/${markId}`, null, { params: { messageId } });
  };
}

export default new ReadMarksApi('/api/read-marks');
