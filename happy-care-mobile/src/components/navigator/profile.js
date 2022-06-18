import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile, UpdateProfile } from '../screens';
import { ScreenName } from '../../api/common';

const Stack = createStackNavigator();

const ProfileNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ScreenName.profile}
      component={Profile}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={ScreenName.updateProfile}
      component={UpdateProfile}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default ProfileNavigation;
