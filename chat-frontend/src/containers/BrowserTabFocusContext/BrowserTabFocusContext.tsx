import React, { FC, useState, useEffect } from 'react';

interface ContextProps {
  isBrowserTabFocused: boolean;
}

export const BrowserTabFocusContext = React.createContext<ContextProps>({ isBrowserTabFocused: true });

export const BrowserTabFocusContextProvider: FC = ({ children }) => {
  const [isBrowserTabFocused, setIsBrowserTabFocused] = useState(true);

  useEffect(
    () => {
      const onFocus = () => setIsBrowserTabFocused(true);
      const onBlur = () => setIsBrowserTabFocused(false);

      window.addEventListener('focus', onFocus);
      window.addEventListener('blur', onBlur);

      return () => {
        console.log('remove');
        window.removeEventListener('focus', onFocus);
        window.removeEventListener('blur', onBlur);
      };
    },
    [],
  );

  return (
    <BrowserTabFocusContext.Provider
      value={{ isBrowserTabFocused }}
    >
      {children}
    </BrowserTabFocusContext.Provider>
  );
};
