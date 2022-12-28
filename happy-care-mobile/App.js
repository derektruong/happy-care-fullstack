/* eslint-disable camelcase */
import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { SSRProvider } from '@react-aria/ssr';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import store from './src/redux/store';
import MainNavigator from './src/components/navigator';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const theme = extendTheme({
    fontConfig: {
      Poppin: {
        100: {
          normal: 'Poppins_100Thin',
          italic: 'Poppins_100Thin_Italic',
        },
        200: {
          normal: 'Poppins_200ExtraLight',
          italic: 'Poppins_200ExtraLight_Italic',
        },
        300: {
          normal: 'Poppins_300Light',
          italic: 'Poppins_300Light_Italic',
        },
        400: {
          normal: 'Poppins_400Regular',
          italic: 'Poppins_400Regular_Italic',
        },
        500: {
          normal: 'Poppins_500Medium',
          italic: 'Poppins_500Medium_Italic',
        },
        600: {
          normal: 'Poppins_600SemiBold',
          italic: 'Poppins_600SemiBold_Italic',
        },
        700: {
          normal: 'Poppins_700Bold',
          italic: 'Poppins_700Bold_Italic',
        },
        800: {
          normal: 'Poppins_800ExtraBold',
          italic: 'Poppins_800ExtraBold_Italic',
        },
        900: {
          normal: 'Poppins_900Black',
          italic: 'Poppins_900Black_Italic',
        },
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: 'Poppin',
      body: 'Poppin',
      mono: 'Poppin',
    },
  });
  return (
    fontsLoaded && (
      <SSRProvider>
        <NativeBaseProvider theme={theme}>
          <Provider store={store}>
            <MainNavigator />
          </Provider>
        </NativeBaseProvider>
      </SSRProvider>
    )
  );
};

export default App;
