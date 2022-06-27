import React from 'react';
import { Text, VStack, HStack, Avatar } from 'native-base';
import { UserDefaultProfile } from '../../../../api/common';

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
          uri: channel.avatar || UserDefaultProfile.doctorAvatar,
        }}
      />
      <VStack alignContent="center">
        <Text bold fontSize="16px">
          {channel.title}
        </Text>
        <Text>{channel.content}</Text>
      </VStack>
    </HStack>
  );
};
