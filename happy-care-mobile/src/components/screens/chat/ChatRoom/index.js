import React, { Fragment } from 'react';
import { ChatRoomHeader } from './ChatRoomHeader';
import { MessageList } from './MessageList';

export const ChatRoom = ({ route, navigation }) => {
  return (
    <Fragment>
      <ChatRoomHeader navigation={navigation} route={route}/>
      <MessageList navigation={navigation} route={route}/>
    </Fragment>
  );
}
