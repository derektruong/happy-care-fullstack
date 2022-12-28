import React, { useEffect } from 'react';
import { Text, Pressable, VStack, Heading, FlatList, Avatar, Icon, Input } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { uiActions } from '../../../../redux/actions';
import { userService } from '../../../../redux/services';
import { ScreenName } from '../../../../api/common';
import WebSocketService from '../../../../api/services/websocket.service';
import { ChannelList } from './ChannelList';

export const MemberLobby = ({ navigation }) => {
  const dispatch = useDispatch();
  const { onlineDoctors } = useSelector((state) => state.socket);
  const { doctors } = useSelector((state) => state.role);

  useEffect(() => {
    userService.getDoctors();

    const intervalDoctorsOnline = setInterval(() => {
      WebSocketService.emitGetDoctorInApp();
    }, 15000);
    return () => clearInterval(intervalDoctorsOnline);
  }, []);

  const onSearchHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.searchDoctor));
    navigation.navigate(ScreenName.searchDoctor, {});
  };

  const onSelectDoctorHandler = (doctor) => {
    dispatch(uiActions.navigateScreen(ScreenName.chatRoom));
    navigation.navigate(ScreenName.chatRoom, {
      user: doctor,
    });
  };

  return (
    <VStack mt={5}>
      <Input
        placeholder="Search"
        variant="filled"
        w="100%"
        h="35px"
        mb={2}
        borderRadius="10"
        borderWidth="0"
        onFocus={onSearchHandler}
        _light={{
          bg: 'coolGray.300',
        }}
        InputLeftElement={
          <Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />
        }
      />
      <Heading my="2" fontSize="13px" color="blue.500" fontWeight={600}>
        Danh sách bác sĩ
      </Heading>
      <FlatList
        mb={5}
        data={doctors}
        renderItem={({ item }) => (
          <Pressable w="60px" h="80px" mr={1} onPress={() => onSelectDoctorHandler(item)}>
            <VStack alignItems="center">
              <Avatar
                bg="blue.600"
                alignSelf="center"
                size="md"
                p="2px"
                source={{
                  uri: item.avatar,
                }}
              >
                {onlineDoctors.includes(item.id) && <Avatar.Badge bg="green.600" />}
              </Avatar>
              <Text fontSize="8px" textAlign="center">
                {item.fullname}
              </Text>
            </VStack>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
      <ChannelList navigation={navigation} />
    </VStack>
  );
};
