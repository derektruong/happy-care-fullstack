import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'native-base';
import { chatService } from '../../../../redux/services';
import { useSelector } from 'react-redux';
import { Message } from './Message';

export const MessageList = (props) => {
    const { route, navigation } = props;

    const [messages, setMessages] = useState([]);

    const { email } = useSelector((state) => state.user);

    const {doctor} = route.params;

    useEffect(() => {
        const getMessages = async () => {
            const rooms = await chatService.getMyRooms();
            const room = rooms.filter(room => {
                return room.name === `${email}, ${doctor.email}`;
            });
            
            const roomId = room.length > 0 ? room[0]._id : null;
            if(roomId !== null) {
                const messages = await chatService.getMessagesByRoomId(roomId, 1, 100);
                setMessages(messages);
            }
        };
        getMessages();
    }, []);

    return (
        <View>
            <FlatList
                inverted={true}
                data={messages}
                renderItem={({item}) => 
                    <Message message={item} userId={item.user}/>
                }
            />
        </View>
    );
}