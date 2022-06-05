import React from 'react';
import { Text, VStack, Box, Heading, Center } from 'native-base';

export const ChatLobby = () => (
  <Box>
    <Heading fontSize="xl" p="4" pb="3">
      Trò chuyện
    </Heading>
    <VStack w="100%" h="90%">
      <Center h="100%">
        <Text color="black">Trang trò chuyện</Text>
      </Center>
    </VStack>
  </Box>
);
