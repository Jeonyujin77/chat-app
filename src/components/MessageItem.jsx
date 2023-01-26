import React, { memo } from "react";

const MessageItem = ({ message }) => {
  const { nickname, content, time } = message;
  return (
    <div>
      {nickname && <div>{nickname}</div>}
      <div>{content}</div>
      <div>{time}</div>
    </div>
  );
};

export default memo(MessageItem);
