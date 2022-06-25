import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../redux/actions';
import { newsService } from '../../../redux/services';
import { VStack, Image, Text, FlatList, Pressable } from 'native-base';
import { ScreenName } from '../../../api/common';

export const News = ({ navigation }) => {
    const dispatch = useDispatch();
    const { news } = useSelector((state) => state.news)

    useEffect(() => {
        newsService.getNews();
    }, []);

    const redirectWebNews = (link) => {
        dispatch(uiActions.navigateScreen(ScreenName.webNews));
        navigation.navigate(ScreenName.webNews, { link });
    }

    return (
        <FlatList
            data={news}
            keyExtractor={(item, index) => index + 1}
            renderItem={({ item }) => (
                <Pressable onPress={() => redirectWebNews(item.link)} bg="muted.50"
                    _pressed={{
                        transform: [{ scale: 0.96 }]
                    }}>
                    <VStack mx="4" mt="2" bgColor="#fff" borderRadius="12" flexDirection='row'>
                        <Image w="20%" h="20%" m="2" borderRadius="12" source={{
                            uri: item.imgUrl
                        }} alt="News Imgage" size="xl" />
                        <VStack mt="2" mb="4" flexShrink='1'>
                            <Text bold fontSize='sm' numberOfLines={2}>
                                {item.title}
                            </Text>
                            <Text color="muted.500" flex='1' numberOfLines={4}>
                                {item.description}
                            </Text>
                        </VStack>
                    </VStack >
                </Pressable>
            )}
        />
    );
};