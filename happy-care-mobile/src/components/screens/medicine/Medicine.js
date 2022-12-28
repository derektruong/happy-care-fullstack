import React from 'react';
import { VStack, Box, Heading } from 'native-base';
import { MedicineList } from '../chat/ChatRoom/MedicineList';

export const Medicine = () => (
  <Box>
    <Heading fontSize="xl" p="4" pb="3">
      Cửa hàng thuốc
    </Heading>
    <VStack w="100%" h="90%" px={3}>
      <MedicineList />
    </VStack>
  </Box>
);
