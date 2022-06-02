import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, VStack, Box, Heading, Center, Button } from 'native-base';
import { authService } from '../../../redux/services';
import { ScreenName } from '../../../api/common';

export const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentScreen } = useSelector((state) => state.ui);

  useEffect(() => {
    if (currentScreen !== ScreenName.profile) {
      return navigation.navigate(currentScreen);
    }
  }, [currentScreen, navigation]);

  const onLogoutHandler = () => {
    dispatch(authService.logout());
  };
  return (
    <Box safeArea>
      <Heading fontSize="xl" p="4" pb="3">
        Profile
      </Heading>
      <VStack w="100%" h="90%">
        <Center h="100%">
          <Button size="sm" colorScheme="blue" onPress={onLogoutHandler}>
            <Text color="primary.100">Đăng xuất</Text>
          </Button>
        </Center>
      </VStack>
    </Box>
  );
};
