import { MessagesURL, RoomsURL, Logger } from '../../api/common';
import HttpService from '../../api/services/http.service';

class ChatService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatService();
    }

    return this.instance;
  }

  async verifyRoom({ memberId, doctorId }) {
    try {
      const url = `${RoomsURL}/verify-room`;
      const res = await HttpService.post(url, {
        memberId,
        doctorId,
      });

      if (res.success) {
        return res.data.roomId;
      }
    } catch (error) {
      Logger.Error(error);
    }
    return null;
  }

  async getMyRooms() {
    try {
      const url = `${RoomsURL}/me`;
      const res = await HttpService.get(url);

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
      const res = await HttpService.get(url, {
        start: start,
        limit: limit,
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
