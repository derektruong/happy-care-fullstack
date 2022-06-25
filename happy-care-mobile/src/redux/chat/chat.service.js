import { MessagesURL, RoomsURL } from "../../api/common";
import { Logger } from '../../api/common';
import { httpService } from '../../api/services';

class ChatService {
    static getInstance() {
      if (!this.instance) {
        this.instance = new ChatService();
      }
  
      return this.instance;
    }

    async getMyRooms() {
        try {
            const url = `${RoomsURL}/me`;
            const res = await httpService.get(url);
    
            if (res.success) {
                return res.data.rooms;
            }
          } catch (error) {
            Logger.Error(error);
          }
    }

    async getMessagesByRoomId(roomId, start, limit) {
      try {
          const url = `${MessagesURL}/${roomId}`;
          const res = await httpService.get(url, {
            start: start,
            limit: limit
          });
  
          if (res.success) {
              return res.data;
          }
        } catch (error) {
          Logger.Error(error);
        }
  }
}

export const chatService = ChatService.getInstance();