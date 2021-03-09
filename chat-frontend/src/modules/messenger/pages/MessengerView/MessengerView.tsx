import React, { FC, useEffect, useState } from 'react';

import { Paper } from '@material-ui/core';

import {
  ChatsList,
  ChatContents,
  CreateNewChat,
  MessengerTabs,
  MessengerTab,
  UserSettings,
  UserSettingsMenu,
} from 'modules/messenger/components';

import { useDispatch } from 'store';
import { fetchChats } from 'store/messenger/chatsSlice';
import { fetchReadMarks } from 'store/messenger/readMarksSlice';

import { useStyles } from './styles';

const MessengerView: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchChats());
      dispatch(fetchReadMarks());
    },
    [dispatch],
  );

  const [selectedTab, setSelectedTab] = useState(MessengerTab.Chats);

  return (
    <Paper className={styles.rootPaper}>
      <div className={styles.sidebar}>
        {
          selectedTab === MessengerTab.Chats && (
            <>
              <div className={styles.createChat}>
                <CreateNewChat />
              </div>

              <div className={styles.chatsList}>
                <ChatsList />
              </div>
            </>
          )
        }

        {
          selectedTab === MessengerTab.Settings && (
            <div className={styles.settingsMenu}>
              <UserSettingsMenu />
            </div>
          )
        }

        <div className={styles.sidebarTabs}>
          <MessengerTabs
            selectedTab={selectedTab}
            onChange={setSelectedTab}
          />
        </div>
      </div>

      <div className={styles.main}>
        {selectedTab === MessengerTab.Chats && <ChatContents />}
        {selectedTab === MessengerTab.Settings && <UserSettings />}
      </div>
    </Paper>
  );
};

export default MessengerView;
