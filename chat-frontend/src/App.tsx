import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { Router, SpinnerView, StompListener, BrowserTabFocusContextProvider } from 'containers';
import { createStore } from 'store';
import { preloadState } from 'store/preloadState';

import { theme } from './theme';
import { useGlobalStyles } from './index.styles';

function App() {
  useGlobalStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <SpinnerView resolve={preloadState} delay={500}>
          {(preloadedState) => (
            <Provider store={createStore(preloadedState)}>
              <BrowserTabFocusContextProvider>
                <Router />
              </BrowserTabFocusContextProvider>
              <StompListener />
            </Provider>
          )}
        </SpinnerView>
    </ThemeProvider>
  );
}

export default App;
