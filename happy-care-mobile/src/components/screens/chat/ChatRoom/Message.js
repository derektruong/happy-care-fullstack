import React, { useEffect, useState } from 'react';
import { Text, View } from 'native-base';
import { Image } from 'react-native';
import { AsyncStoreHelper } from '../../../../api/helper';

export const Message = (props) => {
  const { message, userId } = props;
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const initCurrentUser = async () => {
      setCurrentUserId(await AsyncStoreHelper.getUserId());
    };
    initCurrentUser();
  }, []);

  return (
    <View
      style={{
        alignSelf: currentUserId === userId ? 'flex-end' : 'flex-start',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '70%',
        flexDirection: 'row',
      }}
      bg={currentUserId === userId ? 'blue.500' : 'muted.200'}
    >
      {message.type === 'text' ? (
        <Text color={currentUserId === userId ? 'white' : 'black'} borderRadius="8">
          {message.content}
        </Text>
      ) : message.type === 'image' ? (
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
      ) : (
        <Text color={currentUserId ? 'white' : 'black'} borderRadius="8">
          {message.content}
        </Text>
      )}
    </View>
  );
};
