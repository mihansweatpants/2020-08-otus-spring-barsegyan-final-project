import React, { FC, useMemo } from 'react';

import { Avatar } from '@material-ui/core';

import { stringToHexColor } from 'utils/colors';

interface Props {
  pictureUrl?: string;
  fallback?: string;
  className?: string;
}

const UserAvatar: FC<Props> = ({
  pictureUrl,
  fallback = '',
  className
}) => {
  const backgroundColor = useMemo(() => stringToHexColor(fallback), [fallback]);

  return (
    <Avatar
      src={pictureUrl}
      className={className}
      style={{ backgroundColor }}
    >
      {fallback[0].toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
