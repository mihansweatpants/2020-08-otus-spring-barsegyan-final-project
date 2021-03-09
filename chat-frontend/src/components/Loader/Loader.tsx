import React, { FC, memo } from 'react';
import { useStyles } from './styles';
import clsx from 'clsx';
import { CircularProgress } from '@material-ui/core';

type OwnProps = {
  containerClassName?: string,
  className?: string,
};

type Props = OwnProps;

const Loader: FC<Props> = ({ className, containerClassName }) => {
  const styles = useStyles();
  return (
    <div className={clsx(styles.root, className)}>
      <div className={clsx(styles.container, containerClassName)}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default memo(Loader);
