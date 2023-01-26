import React, { useCallback, useState } from "react";

const NicknameForm = ({ handleSubmitNickname }) => {
  const [nickname, setNickname] = useState("");

  const handleChangeNickname = useCallback((event) => {
    setNickname(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    handleSubmitNickname(nickname);
    setNickname("");
  }, [handleSubmitNickname, nickname]);

  return (
    <form>
      <div>
        <label>닉네임</label>
        <input
          type="text"
          id="user-name-input"
          maxLength={12}
          value={nickname}
          onChange={handleChangeNickname}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button type="button" onClick={handleSubmit}>
          확인
        </button>
      </div>
    </form>
  );
};

export default NicknameForm;
