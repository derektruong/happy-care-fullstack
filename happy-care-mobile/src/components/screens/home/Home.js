import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, VStack, Text } from 'native-base';
import { userService } from '../../../redux/services';
import { BottomBarHeight } from '../../../api/common';
import { News } from './News';
import { SymptomsKeyword } from './SymptomsKeyword';

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    const setUserInfoById = async () => {
      dispatch(userService.initUserInfo());
    };
    setUserInfoById();
  }, [dispatch]);

  // const getUsersInAppHandler = () => {
  //   socketService.emitGetUserInApp();
  // };

  return (
    <Box mb={BottomBarHeight + 10}>
      <Heading fontSize="xl" p="4" pb="3">
        Chào {profile.fullname}
      </Heading>
      <VStack w="100%" h="100%">
        <SymptomsKeyword navigation={navigation} />
        <Text fontSize="lg" bold color='purple.600' pl='4'>Tin tức</Text>
        <News w="100%" navigation={navigation} />
      </VStack>
    </Box>
  );
};
