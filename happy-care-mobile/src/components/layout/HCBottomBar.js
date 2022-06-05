import React, { useState, useEffect } from 'react';
import { Center, Box, HStack, Pressable, Text, Icon } from 'native-base';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenName } from '../../api/common';

export const HCBottomBar = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentScreen } = useSelector((state) => state.ui);

  const [selected, setSelected] = React.useState(0);

  useEffect(() => {
    if (currentScreen !== ScreenName.login) {
      navigation.navigate(currentScreen);
    }
  }, [currentScreen, navigation]);

  return (
    <Box flex={1} bg="white" width="100%" h="100%" flexShrink={1} alignSelf="center">
      {/* <Center flex={1} /> */}
      <HStack bg="indigo.600" alignItems="center">
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="4"
          flex={1}
          onPress={() => setSelected(0)}
        >
          <Center>
            <Icon
              mb="1"
              as={<Ionicons name={selected === 0 ? 'home' : 'home-outline'} />}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}
        >
          <Center>
            <Icon mb="1" as={<Ionicons name="search" />} color="white" size="sm" />
            <Text color="white" fontSize="12">
              Search
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => setSelected(2)}
        >
          <Center>
            <Icon mb="1" as={<FontAwesome5 name="capsules" />} color="white" size="sm" />
            <Text color="white" fontSize="12">
              Cart
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(3)}
        >
          <Center>
            <Icon mb="1" as={<Ionicons name="person" />} color="white" size="sm" />
            <Text color="white" fontSize="12">
              Account
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};
