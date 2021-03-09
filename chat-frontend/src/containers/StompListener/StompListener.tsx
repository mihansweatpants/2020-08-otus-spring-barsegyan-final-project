import { FC } from 'react';

import { useStompListener } from 'hooks/useStompListener';

const StompListener: FC = () => {
  useStompListener();

  return null;
};

export default StompListener;
