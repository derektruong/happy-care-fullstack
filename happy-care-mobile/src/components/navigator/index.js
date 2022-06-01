import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Home, Login, Register } from '../screens';

const Stack = createStackNavigator();

const MainNavigator = () => (
  <NavigationContainer
    initialRouteName="Home"
    drawerPosition="left"
    drawerType="front"
    edgeWidth={100}
    hideStatusBar={false}
    overlayColor="#00000090"
    drawerStyle={{
      backgroundColor: '#F8F9FA',
      width: 150,
    }}
  >
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20,
  },
});

export default MainNavigator;
