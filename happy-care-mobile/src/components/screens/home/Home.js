import React from 'react';
import { Text, VStack, Box, Button, Heading, Center } from 'native-base';
import { socketService } from '../../../api/services';

export const Home = () => {
  const getUsersInAppHandler = () => {
    socketService.emitGetUserInApp();
  };

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Trang chủ
      </Heading>
      <VStack w="100%" h="90%">
        <Center h="100%">
          <Text color="black">Chào mừng đến trang chủ</Text>
          <Button size="sm" colorScheme="blue" onPress={getUsersInAppHandler}>
            <Text color="primary.100">Get user in app</Text>
          </Button>
        </Center>
      </VStack>
    </Box>
  );
};
