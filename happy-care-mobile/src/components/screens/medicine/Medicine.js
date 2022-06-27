import React from 'react';
import { useSelector } from 'react-redux';
import { Text, VStack, Box, Heading, Center, HStack, Select } from 'native-base';
import { Role } from '../../../api/common';

export const Medicine = () => {
  const { role, profile } = useSelector((state) => state.user);

  return (
    <Box px="3">
      <Heading fontSize="xl" py="5">
        Quản lý thuốc
      </Heading>
      <HStack space={3} justifyContent="space-between" alignItems="center">
        {role === Role.doctor ? (
            <Text fontSize="md" color="blue.700">Danh sách thuốc đã kê</Text>
          ) : (
            <Text fontSize="md" color="blue.700">Danh sách thuốc</Text>
        )}
        <Select minWidth="150" accessibilityLabel="Choose Service" placeholder="Choose Service" color="blue.700" textAlign="left"
        _selectedItem={{
          bg: "teal.600"
        }}>
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
      </HStack>
      <VStack w="100%" h="90%">
        <Center h="100%">
          <Text color="black">Trang quản lý thuốc</Text>
        </Center>
      </VStack>
    </Box>
  );
}
