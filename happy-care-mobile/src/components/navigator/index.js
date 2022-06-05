import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast, Box } from 'native-base';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './auth';

const MainNavigator = () => {
  const { notification } = useSelector((state) => state.ui);
  const toast = useToast();

  useEffect(() => {
    if (!isEmpty(notification)) {
      toast.show({
        render: () => {
          if (notification.status === 'success') {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                {notification.message}
              </Box>
            );
          }

          if (notification.status === 'error') {
            return (
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                {notification.message}
              </Box>
            );
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <NavigationContainer>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#272D2D' }}>
        <StatusBar />
      </SafeAreaView>
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default MainNavigator;
