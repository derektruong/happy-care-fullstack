import io from 'socket.io-client';
import { ServerUrl, SocketKey, Logger } from '../common';
import store from '../../redux/store';
import { socketActions } from '../../redux/actions';

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

  emitDisconnect() {
    if (this.socket) {
      this.socket.emit(SocketKey.Disconnect);
      Logger.Info('Disconnected app');
    }
  }
}

export const socketService = WebSocketService.getInstance();
