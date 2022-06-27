import React, { useEffect } from 'react';
import { VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import { uiActions } from '../../../redux/actions';
import { HCBackHeader } from '../../layout';
import { ScreenName } from '../../../api/common';

export const WebNews = ({ route, navigation }) => {
  const { link } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  const onBackScreenHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.home));
    navigation.navigate(ScreenName.home)?.setOptions({ tabBarStyle: { display: 'none' } });
  };

  return (
    <VStack style={{ flex: 1 }}>
      <HCBackHeader onBackScreenHandler={onBackScreenHandler} />
      <WebView
        source={{
          uri: link,
        }}
      />
    </VStack>
  );
};
