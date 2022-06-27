import React from 'react';
import { Text, Box } from 'native-base';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

export const Message = (props) => {
  const { message, userId } = props;
  const { id: currentUserId } = useSelector((state) => state.user);

  let chatContent = null;

  switch (message.type) {
    case 'text':
      chatContent = (
        <Text color={currentUserId === userId ? 'white' : 'black'} borderRadius="8">
          {message.content}
        </Text>
      );
      break;
    case 'image':
      chatContent = (
        <Image
          source={{
            uri: message.content,
          }}
          style={{
            resizeMode: 'contain',
            flex: 1,
            aspectRatio: 1,
          }}
        />
      );
      break;
    case 'prescription':
      chatContent = (
        <Text color={currentUserId ? 'white' : 'black'} borderRadius="8">
          {message.content}
        </Text>
      );
      break;
    default:
      break;
  }

  return (
    <Box
      style={{
        alignSelf: currentUserId === userId ? 'flex-end' : 'flex-start',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 'auto',
        maxWidth: '60%',
        flexDirection: 'row',
      }}
      bg={currentUserId === userId ? 'blue.500' : 'muted.200'}
    >
      {chatContent}
    </Box>
  );
};
