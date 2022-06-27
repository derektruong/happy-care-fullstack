import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HStack, Spinner, Heading } from 'native-base';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { chatService } from '../../../../redux/services';
import { Message } from './Message';

export const MessageList = (props) => {
  const { route, roomId } = props;

  const { id: currentUserId, email } = useSelector((state) => state.user);
  const { latestMessage } = useSelector((state) => state.chat);

  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { doctor } = route.params;

  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true);
      if (roomId !== null) {
        const initMessages = await chatService.getMessagesByRoomId(roomId, 0, 15);
        setMessages(initMessages);
      }
      setIsLoading(false);
    };
    getMessages();
    return () => {
      setMessages([]);
    };
  }, [doctor.email, email, roomId]);

  useEffect(() => {
    if (
      latestMessage &&
      latestMessage.room === roomId &&
      latestMessage.user === currentUserId &&
      latestMessage._id !== messages[0]._id
    ) {
      setMessages((prevMessages) => [latestMessage, ...prevMessages]);
    }
  }, [currentUserId, latestMessage, messages, roomId]);

  const onScrollToTopHandler = async (scroll) => {
    if (currentPage < 0) return;
    if (isLoading) return;
    setIsLoading(true);
    if (scroll.nativeEvent.velocity.y > 0) {
      const loadedMessages = await chatService.getMessagesByRoomId(
        roomId,
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
    <>
      {isLoading && (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="blue.600" fontSize="md">
            Đang tải
          </Heading>
        </HStack>
      )}
      <KeyboardAwareFlatList
        inverted
        data={messages}
        renderItem={({ item }) => <Message message={item} userId={item.user} />}
        keyExtractor={(item, index) => index.toString()}
        onScrollEndDrag={onScrollToTopHandler}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};
