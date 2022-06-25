import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ScreenName } from '../../../../api/common';
import {ChatRoomHeader} from './ChatRoomHeader'

export const ChatRoom = ({ navigation }) => {
  const { currentScreen } = useSelector((state) => state.ui);

  useEffect(() => {
    if (currentScreen !== ScreenName.chatRoom) {
      return navigation.navigate(currentScreen);
    }
  }, [currentScreen, navigation]);

  return (
    <ChatRoomHeader/>
  );
};