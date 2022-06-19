import React, { useEffect, useState } from 'react';
import { Text, VStack, HStack, Heading, Avatar } from 'native-base';
import { UserDefaultProfile } from '../../../../api/common';

export const DoctorLobby = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {}, []);

  return (
    <VStack mt={5}>
      <Heading my="2" size="md" color="blue.500" fontWeight={600}>
        Danh sách tư vấn
      </Heading>
      <HStack alignItems="center" space={5}>
        <Avatar
          bg="blue.600"
          alignSelf="center"
          size="md"
          p="2px"
          source={{
            uri: UserDefaultProfile.avatar,
          }}
        />
        <VStack alignContent="center">
          <Text bold fontSize="16px">
            Tên thành viên
          </Text>
          <Text>{'Message content'}</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};
