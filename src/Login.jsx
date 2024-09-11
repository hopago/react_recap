import { useRef, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import axios from "./api/axios";

import useAuth from "./hooks/useAuth";
import useInput from "./hooks/useInput";
import useToggle from "./hooks/useToggle";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuthentication } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const usernameRef = useRef();
  const errRef = useRef();

  const {
    reset,
    attributeObj: { value: username, onChange: setUsername },
  } = useInput("username", "");
  const [password, setPassword] = useState("");
  const [errMessage, setErrorMessage] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        LOGIN_URL,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { accessToken, user } = res.data;

      const { password, ...userInfo } = user;

      setAuthentication({
        accessToken,
        user: userInfo,
      });

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) return setErrorMessage("서버 응답 오류");

      if (err.response.status === 400)
        return setErrorMessage("유저명, 비밀번호 전송 오류");
      if (err.response.status === 401)
        return setErrorMessage("유저명, 비밀번호 입력 오류");

      setErrorMessage("로그인 오류");

      errRef.current.focus();
    } finally {
      reset();
      setPassword("");
      setErrorMessage("");
    }
  };

  useEffect(() => {
    if (usernameRef.current !== undefined) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMessage}
      </p>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">유저명:</label>
        <input
          ref={usernameRef}
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          value={username}
          required
        />
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>로그인</button>
        <div>
          <label htmlFor="persist">신뢰할 수 있는 기기인가요?</label>
          <input
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
          />
        </div>
      </form>
    </section>
  );
};

export default Login;
