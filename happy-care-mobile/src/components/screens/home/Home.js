import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, VStack, Box, Button, Heading, Center } from 'native-base';
import { userService } from '../../../redux/services';
import { socketService } from '../../../api/services';

export const Home = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    const setUserInfoById = async () => {
      dispatch(userService.initUserInfo());
    };
    setUserInfoById();
  }, [dispatch]);

  const getUsersInAppHandler = () => {
    socketService.emitGetUserInApp();
  };

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Chào {profile.fullname}
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
