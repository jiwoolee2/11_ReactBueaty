import { useState, useEffect, createContext } from "react";

// createContext는 리액트 컴포넌트 간에 데이터를 직접 props
// 없이 공유할 수 있도록 도와주는 "컨텍스트(Context)" 이다.

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // session.setAttribute("키",밸류) 하는거임

  const [auth, setAuth] = useState({
    memberNo: null,
    memberId: null,
    memberName: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    // localStorage로붙어 데이터를  받아서 변수에 담음
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const memberName = localStorage.getItem("memberName");
    const memberId = localStorage.getItem("memberId");
    const memberNo = localStorage.getItem("memberNo");

    // 데이터에 값이 모두 들어있다면 권한을 허용
    if (accessToken && refreshToken && memberName && memberId && memberNo) {
      setAuth({
        memberNo,
        memberId,
        memberName,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
    localStorage.getItem("isLogIn") == "true"
      ? setIsLogIn(true)
      : setIsLogIn(false);
  }, []);

  const socketUrl = isLogIn ? `ws://localhost:8081/ws/chat/adminRoom` : null;

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => console.log("웹 소켓 연결 성공"),
      onClose: () => console.log("웹 소켓 연결 종료"),
      shouldReconnect: (closeEvent) => true, // 자동 재연결 설정
      reconnectAttempts: 3, // 재연결 시도 횟수
      reconnectInterval: 5000, // 재연결 시도 간격 (ms)
    }
  );

  // 로그인 했을 때 localStorage에 상태를 true로 집어넣음
  const afterLogin = () => {
    localStorage.setItem("isLogIn", "true");
  };
  // 로그인 했을 때 localStorage에 상태를 false 집어넣음
  const afterLogOut = () => {
    localStorage.setItem("isLogIn", "false");
  };

  // 로그인 통해 받은 데이터들을 auth에 대입
  const login = (memberNo, memberId, memberName, accessToken, refreshToken) => {
    setAuth({
      memberNo,
      memberId,
      memberName,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("memberName", memberName);
    localStorage.setItem("memberId", memberId);
    localStorage.setItem("memberNo", memberNo);
  };

  // 로그아웃 : auth 싺 지우고, localStorage싹지우고
  const logout = () => {
    setAuth({
      memberNo: null,
      memberId: null,
      memberName: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("memberNo");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        afterLogin,
        afterLogOut,
        isLogIn,
        lastJsonMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
