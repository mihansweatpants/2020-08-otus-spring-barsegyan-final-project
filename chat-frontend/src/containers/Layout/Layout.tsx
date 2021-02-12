import React, { FC } from 'react';
import { Container } from '@material-ui/core';

import { useStyles } from './styles';

const Layout: FC = ({ children }) => {
  const styles = useStyles();

  return (
    <Container className={styles.container}>
      <main className={styles.content}>
        {children as React.ReactElement}
      </main>
    </Container>
  );
};

export default Layout;
