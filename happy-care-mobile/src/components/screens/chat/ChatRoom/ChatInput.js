import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { HStack, IconButton, Icon, Input } from 'native-base';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { MessageType, Role } from '../../../../api/common';
import WebSocketService from '../../../../api/services/websocket.service';
import CloudinaryService from '../../../../api/services/cloudinary.service';
import { PrescriptionModal } from './PrescriptionModal';

export const ChatInput = (props) => {
  const { roomId } = props;

  const { role, id: currentUserId } = useSelector((state) => state.user);

  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState('text');
  const [isPrescriptionModalVisible, setIsPrescriptionModalVisible] = useState(false);

  const onChangeMessageContent = (text) => {
    setMessageContent(text);
    setMessageType(MessageType.text);
  };

  const onSendMessageHandler = () => {
    if (messageContent.length > 0) {
      WebSocketService.emitSendMessage({
        roomId,
        content: messageContent.trim(),
        type: messageType,
        userId: currentUserId,
      });
      setMessageContent('');
    }
  };

  const onPickImageHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      maxWidth: 416,
      maxHeight: 416,
      quality: 0.05,
    });

    if (!result.canceled) {
      const { assets } = result;

      if (isEmpty(assets)) return;

      const { uri } = assets[0];
      const imageUrl = await CloudinaryService.uploadImage(uri);
      setMessageContent(imageUrl);
      onSendImageHandler(imageUrl);
    }
  };

  const onSendImageHandler = (imageUrl) => {
    setMessageType(MessageType.image);
    WebSocketService.emitSendMessage({
      roomId,
      content: imageUrl,
      type: MessageType.image,
      userId: currentUserId,
    });
    setMessageContent('');
  };

  const onSendPrescriptionHandler = (prescription) => {
    const { diagnose, medicines } = prescription;

    let messageText = `Chẩn đoán: ${diagnose}\n`;

    medicines.forEach((med, index) => {
      messageText += `Thuốc ${index + 1}: ${med.name}(${med.dosage})\n`;
    });

    if (messageText.length > 0) {
      WebSocketService.emitSendMessage({
        roomId,
        content: messageText.trim(),
        type: MessageType.prescription,
        userId: currentUserId,
      });
      setMessageContent('');
    }
  };

  return (
    <>
      <HStack w="90%" h="70px" mb={2} justifyContent="space-between" alignItems="center">
        <IconButton
          icon={<Icon as={Ionicons} name="image" />}
          onPress={onPickImageHandler}
          _icon={{
            color: 'warmGray.700',
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
        {role === Role.doctor && (
          <IconButton
            icon={<Icon as={Fontisto} name="drug-pack" />}
            paddingX={0}
            onPress={() => setIsPrescriptionModalVisible(true)}
            _icon={{
              color: 'secondary.500',
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
        )}
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
      <PrescriptionModal
        onSendPrescriptionHandler={onSendPrescriptionHandler}
        isPrescriptionModalVisible={isPrescriptionModalVisible}
        setIsPrescriptionModalVisible={setIsPrescriptionModalVisible}
      />
    </>
  );
};
