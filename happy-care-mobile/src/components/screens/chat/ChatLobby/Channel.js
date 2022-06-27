import React from 'react';
import { Text, VStack, HStack, Avatar } from 'native-base';

export const Channel = (props) => {
  const { channel } = props;

  return (
    <HStack alignItems="center" space={5} mb={5}>
      <Avatar
        bg="blue.600"
        alignSelf="center"
        size="md"
        p="2px"
        source={{
          uri: channel.avatar,
        }}
      />
      <VStack alignContent="center">
        <Text bold fontSize="16px">
          {channel.fullname}
        </Text>
        <Text>{channel.content}</Text>
      </VStack>
    </HStack>
  );
};
