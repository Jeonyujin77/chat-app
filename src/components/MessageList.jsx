import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeMessage, SocketContext, SOCKET_EVNET } from "../service/socket";
import MessageItem from "./MessageItem";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const chatWindow = useRef(null);
  const socket = useContext(SocketContext);

  // 새 메시지를 받으면 스크롤을 이동하는 함수
  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // RECEIVE_MESSAGE 이벤트 콜백: message state에 데이터를 추가
  const handleReceiveMessage = useCallback(
    (pongData) => {
      const newMessage = makeMessage(pongData);
      setMessages((messages) => [...messages, newMessage]);
      moveScrollToReceiveMessage();
    },
    [moveScrollToReceiveMessage]
  );

  useEffect(() => {
    socket.on(SOCKET_EVNET.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SOCKET_EVNET.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [socket, handleReceiveMessage]);

  return (
    <div ref={chatWindow}>
      {messages.map((message, index) => {
        return <MessageItem key={index} message={message} />;
      })}
    </div>
  );
};

export default MessageList;
