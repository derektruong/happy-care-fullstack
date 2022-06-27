import React from 'react';
import { HStack, IconButton, Icon, Text, Avatar } from 'native-base';
import { Entypo, FontAwesome } from '@expo/vector-icons';

export const ChatRoomHeader = (props) => {
  const { route, navigation } = props;

  const { doctor } = route.params;

  const onBackScreenHandler = () => {
    navigation.goBack();
  };

  return (
    <HStack w="100%" h="60px" justifyContent="space-between" alignItems="center" bg="blue.600">
      <IconButton
        icon={<Icon as={Entypo} name="chevron-left" />}
        borderRadius="full"
        onPress={onBackScreenHandler}
        _icon={{
          color: 'white',
          size: 'md',
        }}
        _pressed={{
          bg: 'blue.200:alpha.20',
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        }}
      />
      <HStack alignItems="center" flex={2}>
        <Avatar
          bg="white"
          alignSelf="center"
          size="sm"
          p="2px"
          mx="10px"
          source={{
            uri: doctor.avatar,
          }}
        />
        <Text bold fontSize="14px" color="white">
          {doctor.fullname}
        </Text>
      </HStack>
      <HStack>
        <IconButton
          icon={<Icon as={FontAwesome} name="phone" />}
          borderRadius="full"
          _icon={{
            color: 'white',
            size: 'md',
          }}
          _pressed={{
            bg: 'blue.200:alpha.20',
            _ios: {
              _icon: {
                size: '2xl',
              },
            },
          }}
          _ios={{
            _icon: {
              size: '2xl',
            },
          }}
        />
        <IconButton
          icon={<Icon as={FontAwesome} name="video-camera" />}
          borderRadius="full"
          _icon={{
            color: 'white',
            size: 'md',
          }}
          _pressed={{
            bg: 'blue.200:alpha.20',
            _ios: {
              _icon: {
                size: '2xl',
              },
            },
          }}
          _ios={{
            _icon: {
              size: '2xl',
            },
          }}
        />
      </HStack>
    </HStack>
  );
};
