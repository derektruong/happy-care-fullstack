import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register } from '../screens';
import BottomTabNavigation from './bottom-tab';
import { ScreenName } from '../../api/common';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ScreenName.login}
      component={Login}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={ScreenName.register}
      component={Register}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={ScreenName.bottomTab}
      component={BottomTabNavigation}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigation;
