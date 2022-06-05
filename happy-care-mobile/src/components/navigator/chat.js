import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatLobby } from '../screens';
import { ScreenName } from '../../api/common';

const Stack = createStackNavigator();

const ChatNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ScreenName.chatLobby}
      component={ChatLobby}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default ChatNavigation;
