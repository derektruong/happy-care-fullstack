import 'react-native-get-random-values';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { ServerUrl, SocketKey, Logger } from '../common';
import store from '../../redux/store';
import { socketActions, chatActions } from '../../redux/actions';

class WebSocketService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new WebSocketService();
    }

    return this.instance;
  }

  constructor() {
    this.socket = io(ServerUrl, {
      transports: ['websocket'],
      reconnectionAttempts: 15,
    });

    this.socket.on(SocketKey.Connect, () => {
      store.dispatch(socketActions.connectApp(true));
    });

    this.socket.on(SocketKey.ConnectError, (err) => {
      Logger.Error(`Connect error due to ${err.message}`);
    });
  }

  onReceiveMessage() {
    if (this.socket) {
      this.socket.on(SocketKey.ReceiveMessage, (res) => {
        Logger.Info(`Receive message:\n${JSON.stringify(res)}`);
        store.dispatch(
          chatActions.setCommingMessage({
            _id: uuidv4(),
            content: res.content,
            type: res.type,
            time: res.time,
            user: res.user,
          })
        );
      });
    }
  }

  emitJoinApp({ token }) {
    if (this.socket) {
      this.socket.emit(SocketKey.Join, token, (res) => {
        Logger.Info(`Join app with token:\n${JSON.stringify(res)}`);
      });
    }
  }

  emitGetUserInApp() {
    if (this.socket) {
      this.socket.emit(SocketKey.GetUsersInApp, this.socket.id, (res) => {
        Logger.Info(`Get users in app:\n${JSON.stringify(res)}`);
      });
    }
  }

  emitGetDoctorInApp() {
    if (this.socket) {
      this.socket.emit(SocketKey.GetDoctorsInApp, this.socket.id, (res) => {
        if (res.success && res.data.doctors) {
          const doctors = res.data.doctors.map((doctor) => doctor.userId);
          store.dispatch(socketActions.setOnlineDoctors(doctors));
        }
      });
    }
  }

  emitJoinChatRoom({ roomId, userId }) {
    if (this.socket) {
      const ackData = {
        roomId,
        userId,
      };
      this.socket.emit(SocketKey.JoinChatRoom, ackData, (res) => {
        Logger.Info(`Join chat room:\n${JSON.stringify(res)}`);
      });
    }
  }

  emitLeaveChatRoom({ roomId }) {
    if (this.socket) {
      const ackData = roomId;
      this.socket.emit(SocketKey.LeaveChatRoom, ackData, (res) => {
        Logger.Info(`Leave chat room:\n${JSON.stringify(res)}`);
      });
    }
  }

  emitSendMessage({ roomId, content, type, userId }) {
    if (this.socket) {
      const ackData = {
        roomId,
        content,
        type,
        userId,
      };
      this.socket.emit(SocketKey.SendMessage, ackData, (res) => {
        Logger.Info(`Send message:\n${res}`);
        if (res && res.success) {
          store.dispatch(
            chatActions.setLatestMessage({
              content,
              type,
              _id: uuidv4(),
              room: roomId,
              user: userId,
            })
          );
        }
      });
    }
  }

  emitDisconnect() {
    if (this.socket) {
      this.socket.emit(SocketKey.Disconnect);
      Logger.Info('Disconnected app');
    }
  }
}

export const socketService = WebSocketService.getInstance();
