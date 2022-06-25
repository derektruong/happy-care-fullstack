import React from 'react';
import { Text } from 'native-base';

export const Message = (props) => {

  return (
    <View style={{
        alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
        backgroundColor: isMyMessage ? '#ADD8E6' : '#ededed',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '70%',
      }}>
        <Text>Hello everybody</Text>
      </View>
  );
};