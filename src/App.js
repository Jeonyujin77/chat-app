import { useCallback, useEffect, useRef, useState } from "react";
import ChatRoom from "./components/ChatRoom";
import NicknameForm from "./components/NicknameForm";
import { socket, SocketContext, SOCKET_EVNET } from "./service/socket";

function App() {
  const prevNickname = useRef(null); // prevNickname변경은 컴포넌트를 리렌더링하지 않는다
  const [nickname, setNickname] = useState("김첨지");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // JOIN_ROOM 이벤트타입과 닉네임을 소켓서버에 전송
    socket.emit(SOCKET_EVNET.JOIN_ROOM, { nickname });
  }, [nickname]);

  useEffect(() => {
    // 닉네임 변경 시
    if (prevNickname.current) {
      // 서버에는 이전 닉네임과 바뀐 닉네임을 전송해준다
      socket.emit(SOCKET_EVNET.UPDATE_NICKNAME, {
        prevNickname: prevNickname.current,
        nickname,
      });
    } else {
      socket.emit(SOCKET_EVNET.JOIN_ROOM, { nickname });
    }
  }, [nickname]);

  const handleSubmitNickname = useCallback(
    (newNickname) => {
      prevNickname.current = nickname;
      setNickname(newNickname);
    },
    [nickname]
  );

  return (
    <SocketContext.Provider value={socket}>
      <div>
        <NicknameForm handleSubmitNickname={handleSubmitNickname} />
        <ChatRoom nickname={nickname} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
