import React, { useEffect, Fragment } from 'react';
import { ChatRoomHeader } from './ChatRoomHeader';
import { MessageList } from './MessageList';

export const ChatRoom = ({ route, navigation }) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  return (
    <Fragment>
      <ChatRoomHeader navigation={navigation} route={route}/>
      <MessageList navigation={navigation} route={route}/>
    </Fragment>
  );
}
