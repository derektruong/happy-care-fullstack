import React, {useEffect, useState} from 'react';
import { Text, View } from 'native-base';
import { Image } from 'react-native';
import { AsyncStoreHelper } from '../../../../api/helper';

export const Message = (props) => {
  const { message, userId } = props;

  const [isMyMessage, setIsMyMessage] = useState(false);

  useEffect(() => {
    const checkIsMyMessage = async () => {
      const id = await AsyncStoreHelper.getUserId();
      setIsMyMessage(userId === id);
    }
    checkIsMyMessage();
  }, []);

  return (
    <View style={{
        alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '70%',
        flexDirection: 'row'
      }}
        bg= {isMyMessage ? 'blue.500' : 'muted.200'}
      >
        {
          message.type === 'text' ? (
          <Text
            color={isMyMessage ? 'white' : 'black'}
            borderRadius="8"
          >
            { message.content }
          </Text>) :
          (
            message.type === 'image' ? (<Image 
              source={{
                uri: message.content
              }}
              style={{
                resizeMode: 'contain',
                flex: 1,
                aspectRatio: 1
              }}
            />) :
            (<Text
              color={isMyMessage ? 'white' : 'black'}
              borderRadius="8"
            >
              { message.content }
            </Text>)
          )
        }
      </View>
  );
};