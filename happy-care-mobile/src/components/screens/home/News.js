import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { VStack, Image, Text, FlatList, Pressable, HStack, Spinner, Heading } from 'native-base';
import { uiActions } from '../../../redux/actions';
import { newsService } from '../../../redux/services';
import { ScreenName } from '../../../api/common';

export const News = ({ navigation }) => {
  const dispatch = useDispatch();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setIsLoading(true);
      const initNews = await newsService.getNews({
        start: 0,
        limit: 10,
      });
      setNews(initNews);
      setCurrentPage(0);
      setIsLoading(false);
    };
    getNews();

    return () => {
      setNews([]);
    };
  }, []);

  const redirectWebNews = (link) => {
    dispatch(uiActions.navigateScreen(ScreenName.webNews));
    navigation.navigate(ScreenName.webNews, { link });
  };

  const onReadMoreHandler = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const loadedNews = await newsService.getNews({
      start: (currentPage + 1) * 10,
      limit: 10,
    });
    if (loadedNews.length > 0) {
      setNews((prevNews) => [...prevNews, ...loadedNews]);
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(-1);
    }
    setIsLoading(false);
  };

  return (
    <VStack h="67%">
      <Text h="6%" fontSize="lg" bold color="blue.600" pl="4">
        Tin tức
      </Text>
      {isLoading && currentPage === null && (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="blue.600" fontSize="md">
            Đang tải tin tức
          </Heading>
        </HStack>
      )}
      <FlatList
        mb={5}
        data={news}
        keyExtractor={(item, index) => index + 1}
        renderItem={({ item, index }) => (
          <VStack>
            <Pressable
              onPress={() => redirectWebNews(item.link)}
              bg="muted.50"
              _pressed={{
                transform: [{ scale: 0.96 }],
              }}
            >
              <VStack mx="4" mt="2" bgColor="#fff" borderRadius="12" flexDirection="row">
                <Image
                  w="20%"
                  h="20%"
                  m="2"
                  borderRadius="12"
                  source={{
                    uri: item.imgUrl,
                  }}
                  alt="News Imgage"
                  size="xl"
                />
                <VStack mt="2" mb="4" flexShrink="1">
                  <Text bold fontSize="sm" numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text color="muted.500" flex="1" numberOfLines={4}>
                    {item.description}
                  </Text>
                </VStack>
              </VStack>
            </Pressable>
            {index === news.length - 1 && currentPage >= 0 && (
              <Pressable
                py={2}
                borderRadius="3xl"
                colorScheme="blue"
                alignSelf="center"
                onPress={onReadMoreHandler}
              >
                {isLoading && (
                  <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="blue.600" fontSize="md">
                      Đang tải thêm tin tức
                    </Heading>
                  </HStack>
                )}
                {!isLoading && (
                  <Text bold fontSize="md">
                    Xem thêm
                  </Text>
                )}
              </Pressable>
            )}
          </VStack>
        )}
      />
    </VStack>
  );
};
