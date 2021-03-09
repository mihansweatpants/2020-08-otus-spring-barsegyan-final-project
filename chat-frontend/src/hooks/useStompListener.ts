import { useEffect } from 'react';

import { StompClient } from 'api';
import { StompMessage, StompMessageType } from 'api/types/base/stomp';

import { useDispatch, useSelector } from 'store';
import { updateMessengerStateWithNewMessage } from 'store/messenger/messagesSlice';

export const useStompListener = () => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(state => state.auth.user?.id);

  useEffect(
    () => {
      const onMessageRecieved = (message: StompMessage) => {
        switch (message.type) {
          case StompMessageType.NEW_CHAT_MESSAGE:
            dispatch(updateMessengerStateWithNewMessage(message.payload));
            break;

          default:
            break;
        }
      };

      const StompClientInstance = StompClient.getInstance();

      if (currentUserId != null) {
        StompClientInstance.connect(onMessageRecieved);
      }
      else {
        StompClientInstance.disconnect();
      }
    },
    [currentUserId, dispatch],
  );
};
