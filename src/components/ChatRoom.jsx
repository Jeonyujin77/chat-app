import React from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

const ChatRoom = ({ nickname }) => {
  return (
    <div>
      <div>
        <span>{nickname}</span> 님 환영합니다!
      </div>
      <MessageList />
      <MessageForm nickname={nickname} />
    </div>
  );
};

export default ChatRoom;
