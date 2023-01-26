import dayjs from "dayjs";
import { createContext } from "react";
import socketIo from "socket.io-client";

export const socket = socketIo(String(process.env.REACT_APP_BACK_URL), {
  withCredentials: true,
});
export const SocketContext = createContext(socket);

export const SOCKET_EVNET = {
  // JOIN_ROOM: 유저가 방에 참가했을 때 발생
  JOIN_ROOM: "JOIN_ROOM",
  // UPDATE_NICKNAME: 유저가 닉네임을 변경했을 때 발생
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
  // SEND_MESSAGE: 유저가 메시지를 전송했을 때 발생
  SEND_MESSAGE: "SEND_MESSAGE",
  // RECEIVE_MESSAGE: 유저가 메시지를 받을 때 발생
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
};

export const makeMessage = (pongData) => {
  const { prevNickname, nickname, content, type, time } = pongData;
  let nicknameLabel;
  let contentLabel = "";

  switch (type) {
    case SOCKET_EVNET.JOIN_ROOM: {
      contentLabel = `${nickname} has joined the room.`;
      break;
    }
    case SOCKET_EVNET.UPDATE_NICKNAME: {
      contentLabel = `User's name  has been changed.\n${prevNickname} => ${nickname}.`;
      break;
    }
    case SOCKET_EVNET.SEND_MESSAGE: {
      contentLabel = String(content);
      nicknameLabel = nickname;
      break;
    }

    default:
  }

  return {
    nickname: nicknameLabel,
    content: contentLabel,
    time: dayjs(time).format("HH:mm"),
  };
};

socket.on("connect", () => {
  console.log("socket server connected.");
});

socket.on("disconnect", () => {
  console.log("socket server disconnected.");
});
