import React from 'react';
import {
  Text,
  VStack,
  HStack,
  Avatar,
} from 'native-base';
import { UserDefaultProfile } from '../../../../api/common';

export const Chanel = (props) => {

  const { chanel } = props;

  return (
    <HStack alignItems="center" space={5} mb={5}>
        <Avatar
            bg="blue.600"
            alignSelf="center"
            size="md"
            p="2px"
            source={{
              uri: chanel.avatar || UserDefaultProfile.doctorAvatar,
            }}
        />
        <VStack alignContent="center">
            <Text bold fontSize="16px">
            {chanel.title}
            </Text>
            <Text>{chanel.content}</Text>
        </VStack>
    </HStack>
  );
};