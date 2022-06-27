import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, VStack } from 'native-base';
import { LogBox } from 'react-native';
import { userService } from '../../../redux/services';
import { News } from './News';
import { SymptomsKeyword } from './SymptomsKeyword';
import { Role } from '../../../api/common';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const { role, profile } = useSelector((state) => state.user);

  useEffect(() => {
    const setUserInfoById = async () => {
      dispatch(userService.initUserInfo());
    };
    setUserInfoById();
  }, [dispatch]);

  return (
    <Box>
      <Heading w="100%" h="6%" fontSize="xl" p="4">
        Chào {profile.fullname}
      </Heading>
      <VStack w="100%" h="94%">
        {role === Role.member && <SymptomsKeyword navigation={navigation} />}
        <News w="100%" navigation={navigation} role={role} />
      </VStack>
    </Box>
  );
};
