/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Home, ChatLobby, Medicine } from '../screens';
// import HomeNavigation from './home.navigation';
// import ChatNavigation from './chat.navigation';
// import MedicineNavigation from './medicine.navigation';
import ProfileNavigation from './profile';
import { ScreenName, BottomBarHeight } from '../../api/common';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => (
  <Tab.Navigator
    initialRouteName={ScreenName.home}
    screenOptions={() => ({
      tabBarActiveTintColor: '#15803d',
      tabBarInactiveTintColor: '#373F47',
      tabBarActiveBackgroundColor: '#bae6fd',
      tabBarInactiveBackgroundColor: '#E9F1F7',
      tabBarLabelStyle: { fontSize: 13, fontWeight: '500' },
      tabBarStyle: {
        height: BottomBarHeight,
        position: 'absolute',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    })}
  >
    <Tab.Screen
      name={ScreenName.home}
      component={Home}
      options={{
        headerShown: false,
        tabBarLabel: 'Trang chủ',
        tabBarIcon: ({ focused, size }) => {
          const iconName = focused ? 'home' : 'home-outline';
          size = focused ? 30 : 20;
          return <Ionicons name={iconName} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name={ScreenName.chatLobby}
      component={ChatLobby}
      options={{
        headerShown: false,
        tabBarLabel: 'Trò chuyện',
        tabBarIcon: ({ focused, size }) => {
          const iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          size = focused ? 30 : 20;
          return <Ionicons name={iconName} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name={ScreenName.medicine}
      component={Medicine}
      options={{
        headerShown: false,
        tabBarLabel: 'Thuốc',
        tabBarIcon: ({ focused, size }) => {
          const iconName = focused ? 'medical' : 'medical-outline';
          size = focused ? 30 : 20;
          return <Ionicons name={iconName} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name={ScreenName.profileNavigation}
      component={ProfileNavigation}
      options={{
        headerShown: false,
        tabBarLabel: 'Cá nhân',
        tabBarIcon: ({ focused, size }) => {
          const iconName = focused ? 'person' : 'person-outline';
          size = focused ? 30 : 20;
          return <Ionicons name={iconName} size={size} />;
        },
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigation;
