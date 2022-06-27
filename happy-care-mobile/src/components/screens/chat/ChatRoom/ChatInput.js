import React, { useState } from 'react';
import { HStack, IconButton, Icon, Input } from 'native-base';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { MessageType } from '../../../../api/common';
import { socketService } from '../../../../api/services';

export const ChatInput = (props) => {
  const { onBackScreenHandler, roomId } = props;

  const { id: currentUserId } = useSelector((state) => state.user);
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState('text');

  const onChangeMessageContent = (text) => {
    setMessageContent(text);
    setMessageType(MessageType.text);
  };

  const onSendMessageHandler = () => {
    if (messageContent.length > 0) {
      socketService.emitSendMessage({
        roomId,
        content: messageContent.trim(),
        type: messageType,
        userId: currentUserId,
      });
      setMessageContent('');
    }
  };

  return (
    <HStack w="90%" h="70px" mb={2} justifyContent="space-between" alignItems="center">
      <IconButton
        icon={<Icon as={Ionicons} name="image" />}
        onPress={onBackScreenHandler}
        _icon={{
          color: 'blue.600',
          size: 'xl',
        }}
        _pressed={{
          bg: 'blue.200:alpha.20',
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        }}
      />
      <IconButton
        icon={<Icon as={FontAwesome5} name="stethoscope" />}
        paddingX={0}
        onPress={onBackScreenHandler}
        _icon={{
          color: 'blue.600',
          size: 'xl',
        }}
        _pressed={{
          bg: 'blue.200:alpha.20',
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        }}
      />
      <Input
        placeholder="Nhập tin nhắn"
        w="70%"
        fontSize="md"
        value={messageContent}
        onChangeText={onChangeMessageContent}
      />
      <IconButton
        icon={<Icon as={Ionicons} name="send" />}
        onPress={onSendMessageHandler}
        _icon={{
          color: 'blue.600',
          size: 'xl',
        }}
        _pressed={{
          bg: 'blue.200:alpha.20',
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        }}
      />
    </HStack>
  );
};
