import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { newsService } from '../../../redux/services';
import { VStack, Image, HStack, Flex, Text, FlatList } from 'native-base';

export const News = () => {
    const { news } = useSelector((state) => state.news)

    useEffect(() => {
        newsService.getNews();
    }, []);

    return (
        // <VStack m="4" bgColor="#fff" borderRadius="12" flexDirection='row'>
        //     <Image w="20%" h="20%" m="2" borderRadius="12" source={{
        //         uri: "https://wallpaperaccess.com/full/317501.jpg"
        //     }} alt="News Imgage" size="xl" />
        //     <VStack mt="2" mb="4" flexShrink='1'>
        //         <Text bold fontSize='sm'>
        //             Nhật Bản ngược dòng làn sóng Omicron "không thể lý giải"
        //         </Text>
        //         <Text color="muted.500">
        //             Khi biến chủng Omicron lây lan khắp thế giới, số ca nhiễm, và tử vong tại Nhật Bản
        //             vẫn giảm mạnh một cách bí ẩn
        //         </Text>
        //     </VStack>
        // </VStack >

        <FlatList
            data={news}
            renderItem={({ item }) => (
                <VStack mx="4" mt="2" bgColor="#fff" borderRadius="12" flexDirection='row'>
                    <Image w="20%" h="20%" m="2" borderRadius="12" source={{
                        uri: item.imgUrl
                    }} alt="News Imgage" size="xl" />
                    <VStack mt="2" mb="4" flexShrink='1'>
                        <Text bold fontSize='sm'>
                            {item.title}
                        </Text>
                        <Text color="muted.500" flex='1' numberOfLines={4}>
                            {item.description}
                        </Text>
                    </VStack>
                </VStack >
            )}
            keyExtractor={(item, index) => index + 1}
        />
    );
};