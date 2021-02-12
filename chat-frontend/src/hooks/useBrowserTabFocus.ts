import { useContext } from 'react';

import { BrowserTabFocusContext } from 'containers';

export const useBrowserTabFocusContext = () => useContext(BrowserTabFocusContext);
