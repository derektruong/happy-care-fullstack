import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import store from './src/redux/store';
import MainNavigator from './src/components/navigator';

const App = () => (
  <NativeBaseProvider>
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  </NativeBaseProvider>
);

export default App;
