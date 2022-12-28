import React, { useEffect, useState } from 'react';
import { Platform, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ChatRoomHeader } from './ChatRoomHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import WebSocketService from '../../../../api/services/websocket.service';
import { chatService } from '../../../../redux/services';
import { uiActions } from '../../../../redux/actions';
import { Role } from '../../../../api/common';

export const ChatRoom = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id, role } = useSelector((state) => state.user);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const handleBackButtonClick = () => {
      WebSocketService.emitLeaveChatRoom({
        roomId,
      });

      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: undefined });
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [navigation, roomId]);

  useEffect(() => {
    const joinChatRoom = async () => {
      const verifyRoomId = await chatService.verifyRoom({
        memberId: role === Role.member ? id : route.params.user.id,
        doctorId: role === Role.member ? route.params.user.id : id,
      });

      if (verifyRoomId) {
        WebSocketService.emitJoinChatRoom({
          userId: id,
          roomId: verifyRoomId,
        });
        setRoomId(verifyRoomId);
      } else {
        dispatch(
          uiActions.showErrorUI({
            title: 'Cannot join chat room',
            message: 'Update your profile before joining the room',
          })
        );
        navigation.goBack();
      }
    };

    joinChatRoom();
  }, [dispatch, id, navigation, role, route.params.user.id]);

  return (
    <>
      <ChatRoomHeader navigation={navigation} route={route} roomId={roomId} />
      <MessageList navigation={navigation} route={route} roomId={roomId} />
      <ChatInput navigation={navigation} route={route} roomId={roomId} />
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </>
  );
};
