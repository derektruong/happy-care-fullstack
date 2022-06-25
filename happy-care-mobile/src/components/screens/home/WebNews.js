import React, { useEffect } from 'react'
import { VStack } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview'
import { uiActions } from '../../../redux/actions';
import { HCBackHeader } from '../../layout';
import { ScreenName } from '../../../api/common';
export const WebNews = ({ route, navigation }) => {
    const { link } = route.params;
    const dispatch = useDispatch();

    const onBackScreenHandler = () => {
        dispatch(uiActions.navigateScreen(ScreenName.home));
        navigation.navigate(ScreenName.home);
    };

    return (
        <VStack style={{ flex: 1 }}>
            <HCBackHeader onBackScreenHandler={onBackScreenHandler}></HCBackHeader>
            <WebView
                source={{
                    uri: link
                }}
            />
        </VStack>
    );
};