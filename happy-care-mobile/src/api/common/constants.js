import { Platform } from 'react-native';

export const AppName = 'Happy care';

export const JwtToken = 'token';

export const BottomBarHeight = Platform.OS === 'android' ? 55 : 85;

export const Role = Object.freeze({
  doctor: 'doctor',
  member: 'member',
});

export const UserDefaultProfile = Object.freeze({
  fullname: 'New User',
  avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png',
});

export const ScreenName = Object.freeze({
  login: 'login',
  register: 'register',
  bottomTab: 'bottomTab',
  home: 'home',
  chatLobby: 'chatLobby',
  medicine: 'medicine',
  profileNavigation: 'profileNavigation',
  profile: 'profile',
  updateProfile: 'updateProfile',
});

export const UiStatus = Object.freeze({
  loading: 'loading',
  success: 'success',
  error: 'error',
});

export const SocketKey = Object.freeze({
  Connect: 'connect',
  Disconnect: 'disconnect',
  ConnectError: 'connect_error',

  // emit
  Join: 'join',
  GetUsersInApp: 'get-users-in-app',
  GetDoctorsInApp: 'get-doctors-in-app',
  GetMembersInApp: 'get-members-in-app',
  GetNumberOfUsers: 'get-number-of-users',
  GetNumberOfDoctors: 'get-number-of-doctors',
  GetNumberOfMembers: 'get-number-of-members',
  GetSocketRooms: 'get-socket-rooms',

  GetDoctorsFromSpecRoom: 'get-doctor-from-spec-room',
  JoinChatRoom: 'join-chat-room',
  LeaveChatRoom: 'leave-chat-room',

  SendMessage: 'send-message',
  TypingMessage: 'typing-message',

  // on
  ReceiveMessage: 'receive-message',
  ReceiveNewMessage: 'receive-new-message',
  ReceiveTypingMessage: 'receive-typing-message',
});

export const AsyncStorageKey = Object.freeze({
  UserId: 'userId',
});
