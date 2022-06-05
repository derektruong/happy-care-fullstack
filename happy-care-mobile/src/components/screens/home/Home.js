import React from 'react';
import { Text, VStack, Box, Heading, Center } from 'native-base';

export const Home = () => (
  <Box>
    <Heading fontSize="xl" p="4" pb="3">
      Trang chủ
    </Heading>
    <VStack w="100%" h="90%">
      <Center h="100%">
        <Text color="black">Chào mừng đến trang chủ</Text>
      </Center>
    </VStack>
  </Box>
);
