import React, { useEffect, useState } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Pressable } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../../redux/actions';
import { chatService } from '../../../../redux/services';
import { Channel } from './Channel';
import { UserDefaultProfile, ScreenName } from '../../../../api/common';

export const ChannelList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { id: currentUserId } = useSelector((state) => state.user);

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
      if (listChannel) {
        setChannels(
          await Promise.all(
            listChannel.map(async (channel) => {
              const messages = await chatService.getMessagesByRoomId(channel._id, 0, 1);
              const lastMessage = messages.length > 0 ? messages[0] : null;

              const currentUserIndex = channel.members.findIndex(
                (user) => user._id === currentUserId
              );

              return {
                id: currentUserIndex === 0 ? channel.members[1]._id : channel.members[0]._id,
                fullname:
                  currentUserIndex === 0
                    ? channel.members[1].profile.fullname || 'Chưa cập nhật'
                    : channel.members[0].profile.fullname || 'Chưa cập nhật',
                avatar:
                  currentUserIndex === 0
                    ? channel.members[1].profile.avatar || UserDefaultProfile.avatar
                    : channel.members[0].profile.avatar || UserDefaultProfile.avatar,
                content: getContentOfChannel(lastMessage),
              };
            })
          )
        );
      }
    };
    getChannels();
    return () => {
      setChannels([]);
    };
  }, [currentUserId]);

  const onSelectChatUser = (user) => {
    dispatch(uiActions.navigateScreen(ScreenName.chatRoom));
    navigation.navigate(ScreenName.chatRoom, {
      user,
    });
  };

  return (
    <KeyboardAwareFlatList
      data={channels}
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelectChatUser(item)}>
          <Channel channel={item} />
        </Pressable>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
