import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import {
  VStack,
  HStack,
  KeyboardAvoidingView,
  IconButton,
  Icon,
  Avatar,
  FlatList,
  Text,
  Pressable,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { uiActions } from '../../../redux/actions';
import { userService, doctorsService } from '../../../redux/services';
import { ScreenName, BottomBarHeight } from '../../../api/common';
import { socketService } from '../../../api/services';

export const SearchDoctorBySpec = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { doctorsBySpec } = useSelector((state) => state.doctorsBySpec);
  const { onlineDoctors } = useSelector((state) => state.socket);
  const { itemSpec } = route.params;

  useEffect(() => {
    userService.getDoctors();
    const intervalDoctorsOnline = setInterval(() => {
      socketService.emitGetDoctorInApp();
    }, 15000);
    return () => clearInterval(intervalDoctorsOnline);
  }, []);

  useEffect(() => {
    doctorsService.getDoctorsBySpec(itemSpec.id);
  }, [itemSpec]);

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  const onBackScreenHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.home));
    navigation.navigate(ScreenName.home);
  };

  const onSelectDoctorHandler = (doctor) => {
    dispatch(uiActions.navigateScreen(ScreenName.chatRoom));
    navigation.navigate(ScreenName.chatRoom, {
      doctor: doctor,
    });
  };

  return (
    <KeyboardAvoidingView
      h={{
        base: '100%',
        lg: 'auto',
      }}
      behavior={Platform.OS === 'ios' && 'padding'}
      mb={BottomBarHeight + 10}
    >
      <VStack pt={2} px={1} w="100%" h="90%">
        <HStack w="100%" h="50px" alignItems="center">
          <IconButton
            icon={<Icon as={Entypo} name="chevron-left" />}
            borderRadius="full"
            onPress={onBackScreenHandler}
            _icon={{
              color: 'black',
              size: 'md',
            }}
            _pressed={{
              bg: 'blue.200:alpha.20',
            }}
          />
          <Text fontSize="md" bold color="blue.700" textAlign="center">
            Danh sách bác sĩ
          </Text>
        </HStack>
        <FlatList
          mb={5}
          pt={5}
          px={3}
          data={doctorsBySpec}
          renderItem={({ item }) => (
            <Pressable w="90%" h="80px" mr={1} onPress={() => onSelectDoctorHandler(item)}>
              <HStack alignItems="center" space={3}>
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
                <VStack alignContent="center">
                  <Text fontSize="12px" fontWeight={500}>
                    {item.profile.fullname}
                  </Text>
                  <Text fontSize="10px">{item.specializations.join(',')}</Text>
                </VStack>
              </HStack>
            </Pressable>
          )}
          keyExtractor={(item, index) => index}
        />
      </VStack>
    </KeyboardAvoidingView>
  );
};
