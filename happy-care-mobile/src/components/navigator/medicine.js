import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Medicine } from '../screens';
import { ScreenName } from '../../api/common';

const Stack = createStackNavigator();

const MedicineNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={ScreenName.medicine}
      component={Medicine}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default MedicineNavigation;
