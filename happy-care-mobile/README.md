# Happy Care ( Ứng dụng hỗ trợ sức khoẻ )

Ứng dụng Tư vấn Sức khỏe Trực tuyến được xây dựng với React native cho Client, ExpressJs cho Server phụ trợ Online Health Consultation Application built with Flutter for Client, ExpressJs for Backend Server.

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6ade1e4b31d343f7863ddf652c17d7be)](https://www.codacy.com/gh/komkat-studio/happy-care-mobile/dashboard?utm_source=github.com&utm_medium=referral&utm_content=komkat-studio/happy-care-mobile&utm_campaign=Badge_Grade)

## Tính năng

- Đọc tin tức về sức khoẻ hàng
- Tìm kiếm bác sĩ theo chuyên khoa **(Currently, the feature is based on database, will upgrade with machine learning later)**
- Tìm bác sĩ đang online
- Hỏi người dùng tình trạng sức khoẻ hiện tại và tìm chuyên khoa theo triệu chứng ( Khi vào ứng dụng ).
- Trò chuyện 1 vs 1 giữa bác sĩ với thành viên, gửi ảnh tư vấn.
- Bác sĩ có thể kê đơn trực tiếp cho thành viên ( Sẽ cập nhật sau )..
- Quản lý thông tin người dùng.

## Công nghệ sử dụng

- React native và Redux pattern
- Xác thực và phân quyền sử dụng JWT.
- Backend sử dụng ExpressJs, MongoDB.
- Chat thời gian thực sử dụng Socket.io.
- Cloudinary để chứa ảnh và tệp tin.

## Cấu trúc dự án

project
│   README.md
│   App.js

<pre id="tree-panel"><bold>src</bold><br/> ┣ api<br/> ┃ ┣ common<br/> ┃ ┃ ┣ constants.js<br/> ┃ ┃ ┣ enum.js<br/> ┃ ┃ ┣ env.js<br/> ┃ ┃ ┣ index.js<br/> ┃ ┃ ┣ logger.js<br/> ┃ ┃ ┗ url-config.js<br/> ┃ ┣ helper<br/> ┃ ┃ ┣ async-store.helper.js<br/> ┃ ┃ ┣ index.js<br/> ┃ ┃ ┣ jwt.helper.js<br/> ┃ ┃ ┗ secure-store.helper.js<br/> ┃ ┗ services<br/> ┃ ┃ ┣ cloudinary.service.js<br/> ┃ ┃ ┣ http.service.js<br/> ┃ ┃ ┣ index.js<br/> ┃ ┃ ┗ websocket.service.js<br/> ┣ assets<br/> ┃ ┣ images<br/> ┃ ┃ ┣ icon-health-care.png<br/> ┃ ┃ ┣ index.js<br/> ┃ ┃ ┣ love.png<br/> ┃ ┃ ┗ redux.png<br/> ┃ ┣ adaptive-icon.png<br/> ┃ ┣ favicon.png<br/> ┃ ┣ icon.png<br/> ┃ ┗ splash.png<br/> ┣ components<br/> ┃ ┣ layout<br/> ┃ ┃ ┣ HCBackHeader.js<br/> ┃ ┃ ┣ HCButton.js<br/> ┃ ┃ ┣ HCHeader.js<br/> ┃ ┃ ┣ HCUpdateHeader.js<br/> ┃ ┃ ┗ index.js<br/> ┃ ┣ navigator<br/> ┃ ┃ ┣ auth.js<br/> ┃ ┃ ┣ bottom-tab.js<br/> ┃ ┃ ┣ chat.js<br/> ┃ ┃ ┣ home.js<br/> ┃ ┃ ┣ index.js<br/> ┃ ┃ ┣ medicine.js<br/> ┃ ┃ ┗ profile.js<br/> ┃ ┗ screens<br/> ┃ ┃ ┣ auth<br/> ┃ ┃ ┃ ┣ Login.js<br/> ┃ ┃ ┃ ┗ Register.js<br/> ┃ ┃ ┣ chat<br/> ┃ ┃ ┃ ┣ ChatLobby<br/> ┃ ┃ ┃ ┃ ┣ Channel.js<br/> ┃ ┃ ┃ ┃ ┣ ChannelList.js<br/> ┃ ┃ ┃ ┃ ┣ DoctorLobby.js<br/> ┃ ┃ ┃ ┃ ┣ MemberLobby.js<br/> ┃ ┃ ┃ ┃ ┣ SearchDoctor.js<br/> ┃ ┃ ┃ ┃ ┗ index.js<br/> ┃ ┃ ┃ ┗ ChatRoom<br/> ┃ ┃ ┃ ┃ ┣ ChatInput.js<br/> ┃ ┃ ┃ ┃ ┣ ChatRoomHeader.js<br/> ┃ ┃ ┃ ┃ ┣ Message.js<br/> ┃ ┃ ┃ ┃ ┣ MessageList.js<br/> ┃ ┃ ┃ ┃ ┗ index.js<br/> ┃ ┃ ┣ home<br/> ┃ ┃ ┃ ┣ Home.js<br/> ┃ ┃ ┃ ┣ News.js<br/> ┃ ┃ ┃ ┣ SearchDoctorBySpec.js<br/> ┃ ┃ ┃ ┣ SearchSpecializations.js<br/> ┃ ┃ ┃ ┣ SymptomsExpand.js<br/> ┃ ┃ ┃ ┣ SymptomsKeyword.js<br/> ┃ ┃ ┃ ┗ WebNews.js<br/> ┃ ┃ ┣ medicine<br/> ┃ ┃ ┃ ┗ Medicine.js<br/> ┃ ┃ ┣ profile<br/> ┃ ┃ ┃ ┣ Profile.js<br/> ┃ ┃ ┃ ┗ UpdateProfile.js<br/> ┃ ┃ ┗ index.js<br/> ┗ redux<br/> ┃ ┣ auth<br/> ┃ ┃ ┣ auth.service.js<br/> ┃ ┃ ┗ auth.slice.js<br/> ┃ ┣ chat<br/> ┃ ┃ ┣ chat.service.js<br/> ┃ ┃ ┗ chat.slice.js<br/> ┃ ┣ doctors<br/> ┃ ┃ ┗ doctors.service.js<br/> ┃ ┣ news<br/> ┃ ┃ ┗ news.service.js<br/> ┃ ┣ role<br/> ┃ ┃ ┗ role.slice.js<br/> ┃ ┣ socket<br/> ┃ ┃ ┗ socket.slice.js<br/> ┃ ┣ specialization<br/> ┃ ┃ ┣ specialization.service.js<br/> ┃ ┃ ┗ specialization.slice.js<br/> ┃ ┣ symptoms<br/> ┃ ┃ ┣ symptoms.service.js<br/> ┃ ┃ ┗ symptoms.slice.js<br/> ┃ ┣ ui<br/> ┃ ┃ ┗ ui.slice.js<br/> ┃ ┣ user<br/> ┃ ┃ ┣ user.service.js<br/> ┃ ┃ ┗ user.slice.js<br/> ┃ ┣ actions.js<br/> ┃ ┣ services.js<br/> ┃ ┗ store.js</pre>

## Chuẩn bị và khởi chạy

- git clone https://github.com/TranNhuTri/HappyCare.git
- cd ./happy-care-mobile
- Cấu hình và chạy
  - Expo
    - Install [Expo](https://expo.dev/).
  - yarn
  - yarn start
- Quét mã QR và chạy

## Screenshots (Chạy thử nghiệm trên IOS và Android)

Sorry for some UIs are not designed in advance, it will be not responsive for 16:9, not as beautiful as the intro, sign in, sign up because there is no time, just code in mind 😣

### Register, Login

|                Register Screen                |                  Login Screen                  |
| :--------------------------------------------: | :--------------------------------------------: |
| ![1656331552031](image/README/1656331552031.png) | ![1656331566022](image/README/1656331566022.png) |

### Main Screen (Quyền member)

|                                                |                                                |                                                |
| :--------------------------------------------: | :--------------------------------------------: | :--------------------------------------------: |
|                  Home Screen                  |            Choose if you feel good            |    Choose if you feel bad to finding doctor    |
| ![1656331627539](image/README/1656331627539.png) | ![1656331642392](image/README/1656331642392.png) | ![1656331652137](image/README/1656331652137.png) |
|                 More Symptoms                 |          Result for choosing symptoms          |                 Choose Doctor                 |
| ![1656331726072](image/README/1656331726072.png) | ![1656331744731](image/README/1656331744731.png) | ![1656331759301](image/README/1656331759301.png) |
|                      News                      |                  Chat Screen                  |                    Profile                    |
| ![1656331859878](image/README/1656331859878.png) | ![1656331876832](image/README/1656331876832.png) | ![1656332003678](image/README/1656332003678.png) |
|                 Update Profile                 |                                                |                                                |
| ![1656332080945](image/README/1656332080945.png) |                                                |                                                |

## Sẽ làm trong tương lai

- Quản lý thuốc
- Notifications
- Tạo đơn thuốc trong chat
- Call video, thoại

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tr>
    <td align="center"><img src="https://cdn-icons-png.flaticon.com/512/3437/3437364.png" width="100px;" alt=""/><br /><sub><b>Trương Minh Đức</b></sub></a><br /><a href="https://github.com/komkat-studio/happy-care-mobile/commits?author=dungngminh" title="Code">💻</a> <a href="https://github.com/komkat-studio/happy-care-mobile/commits?author=dungngminh" title="Documentation">📖</a>
  </tr>
</table>

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
