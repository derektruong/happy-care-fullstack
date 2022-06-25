import React from 'react';
import { UserDefaultProfile } from '../../../../api/common';
import { HStack, IconButton, Icon, Text, Avatar } from 'native-base';
import { Entypo, FontAwesome } from '@expo/vector-icons';

export const ChatRoomHeader = (props) => {

  return (
    <HStack w="100%" h="60px" justifyContent="space-between" alignItems="center" bg="purple.600">
      <IconButton
        icon={<Icon as={Entypo} name="chevron-left" />}
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
      />
      <HStack alignItems="center" flex={2}>
        <Avatar
            bg="white"
            alignSelf="center"
            size="sm"
            p="2px"
            mx="10px"
            source={{
                uri: UserDefaultProfile.avatar,
            }}
            />
        <Text
            bold 
            fontSize="14px"
            color="white"
        >
            Tran Nhu Tri
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