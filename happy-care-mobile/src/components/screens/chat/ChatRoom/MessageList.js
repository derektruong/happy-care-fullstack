import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { chatService } from '../../../../redux/services';
import { Message } from './Message';

export const MessageList = (props) => {
  const { route } = props;

  const { email } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { doctor } = route.params;

  useEffect(() => {
    const getMessages = async () => {
      const rooms = await chatService.getMyRooms();
      const selectedRoom = rooms.filter((r) => r.name === `${email}, ${doctor.email}`);

      const roomId = selectedRoom.length > 0 ? selectedRoom[0]._id : null;
      if (roomId !== null) {
        setRoom(roomId);
        const initMessages = await chatService.getMessagesByRoomId(roomId, 0, 15);
        setMessages(initMessages);
      }
    };
    getMessages();
  }, [doctor.email, email]);

  const onScrollToTopHandler = async (scroll) => {
    if (currentPage < 0) return;
    if (isLoading) return;
    setIsLoading(true);
    if (scroll.nativeEvent.velocity.y > 0) {
      const loadedMessages = await chatService.getMessagesByRoomId(
        room,
        (currentPage + 1) * 15,
        15
      );
      if (loadedMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...loadedMessages]);
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(-1);
      }
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAwareFlatList
      inverted
      data={messages}
      renderItem={({ item }) => <Message message={item} userId={item.user} />}
      keyExtractor={(item) => item._id}
      onScrollEndDrag={onScrollToTopHandler}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};
