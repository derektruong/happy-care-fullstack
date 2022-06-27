import React, { useEffect, useState } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { Role } from '../../../../api/common';
import { chatService } from '../../../../redux/services';
import { Channel } from './Channel';

export const ChannelList = () => {
  const { id: currentUserId, role } = useSelector((state) => state.user);

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getContentOfChannel = (lastMessage) => {
      if (lastMessage === null) return 'Chat nào';
      if (lastMessage.type === 'image') {
        lastMessage.content = 'Đã gửi một ảnh';
      }
      if (lastMessage.type === 'prescription') {
        lastMessage.content = 'Đã gửi đơn thuốc';
      }
      if (lastMessage.user === currentUserId) return `Bạn: ${lastMessage.content}`;
      return lastMessage.content;
    };

    const getChannels = async () => {
      const listChannel = await chatService.getMyRooms();
      setChannels(
        await Promise.all(
          listChannel.map(async (channel) => {
            const messages = await chatService.getMessagesByRoomId(channel._id, 1, 1);
            const lastMessage = messages.length > 0 ? messages[0] : null;

            return {
              title:
                role === Role.doctor
                  ? channel.members[0].profile.fullname
                  : channel.members[1].profile.fullname,
              avatar:
                role === Role.doctor
                  ? channel.members[0].profile.avatar
                  : channel.members[1].profile.avatar,
              content: getContentOfChannel(lastMessage),
            };
          })
        )
      );
    };
    getChannels();
    return () => {
      setChannels([]);
    };
  }, [currentUserId, role]);

  return (
    <KeyboardAwareFlatList
      data={channels}
      renderItem={({ item }) => <Channel channel={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
