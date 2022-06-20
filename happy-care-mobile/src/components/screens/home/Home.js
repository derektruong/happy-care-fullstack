import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, VStack, Box, Button, Heading, Center } from 'native-base';
import { userService } from '../../../redux/services';
import { socketService } from '../../../api/services';
import { BottomBarHeight } from '../../../api/common';
import { News } from './News';

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
    <Box mb={BottomBarHeight + 10}>
      <Heading fontSize="xl" p="4" pb="3">
        Chào {profile.fullname}
      </Heading>
      <VStack w="100%" h="90%" >
        <Text fontSize="lg" bold color='purple.600' pl='4'>Tin tức</Text>
        <News w="100%" />
      </VStack>
    </Box>
  );
};
