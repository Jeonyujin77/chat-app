import React, { useCallback, useContext, useState } from "react";
import { SocketContext, SOCKET_EVNET } from "../service/socket";

const MessageForm = ({ nickname }) => {
  const [typingMessage, setTypingMessage] = useState("");
  const socket = useContext(SocketContext);

  // textarea에서 텍스트를 입력하면 typingMessage state를 변경한다
  const handleChangeTypingMessage = useCallback((event) => {
    setTypingMessage(event.target.value);
  }, []);

  // 버튼을 누르면 실행
  const handleSendMessage = useCallback(() => {
    const noContent = typingMessage.trim() === "";

    if (noContent) return;

    // 메시지가 있으면 nickname, message를 SEND_MESSAGE이벤트타입과 함께 소켓서버로 전송
    socket.emit(SOCKET_EVNET.SEND_MESSAGE, {
      nickname,
      content: typingMessage,
    });
    setTypingMessage("");
  }, [socket, nickname, typingMessage]);

  return (
    <form>
      <div>
        <textarea
          maxLength={400}
          autoFocus
          value={typingMessage}
          onChange={handleChangeTypingMessage}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </form>
  );
};

export default MessageForm;
