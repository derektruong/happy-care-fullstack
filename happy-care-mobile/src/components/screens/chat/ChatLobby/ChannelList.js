import React, { useEffect } from 'react';
import { useState } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Role } from '../../../../api/common';
import { chatService } from '../../../../redux/services';
import { Chanel } from './Chanel';
import { useSelector } from 'react-redux';
import { AsyncStoreHelper } from '../../../../api/helper';

export const ChanelList = (props) => {

  const { role } = useSelector((state) => state.user);

  const [chanels, setChanels] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const getContentOfChanel = (lastMessage) => {
    if(lastMessage === null)
      return 'Chat nào';
    if(lastMessage.type === 'image') {
      lastMessage.content = 'Đã gửi một ảnh';
    }
    if(lastMessage.type === 'prescription') {
      lastMessage.content = 'Đã gửi đơn thuốc';
    }
    if(lastMessage.user === currentUserId)
      return 'Bạn: ' + lastMessage.content;
    return lastMessage.content;
  }

  useEffect(() => {
    const initCurrentUser = async () => {
      setCurrentUserId(await AsyncStoreHelper.getUserId());
    };
    initCurrentUser();

    const getChanels = async () => {
      const chanels = await chatService.getMyRooms();
      setChanels(await Promise.all(chanels.map(async (chanel) => {
        const messages = await chatService.getMessagesByRoomId(chanel._id, 1, 1);
        const lastMessage = messages.length > 0 ? messages[0] : null;

        return {
          title: role === Role.doctor ? chanel.members[0].profile.fullname : chanel.members[1].profile.fullname,
          avatar: role === Role.doctor ? chanel.members[0].profile.avatar : chanel.members[1].profile.avatar,
          content: getContentOfChanel(lastMessage),
        }
      })));
    };
    getChanels();
  }, [role]);

  return (
    <KeyboardAwareFlatList
      data={chanels}
      renderItem={({ item }) =>
        <Chanel chanel={item}/>
      }
    />
  );
};
