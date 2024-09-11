import { useRef, useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "./api/axios";

import useAuth from "./hooks/useAuth";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuthentication } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrorMessage] = useState("");

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
        user: userInfo
      });

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) return setErrorMessage("서버 응답 오류");

      if (err.response.status === 400) return setErrorMessage("유저명, 비밀번호 전송 오류");
      if (err.response.status === 401) return setErrorMessage("유저명, 비밀번호 입력 오류");
      
      setErrorMessage("로그인 오류");
      
      errRef.current.focus();
    } finally {
      setUsername("");
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
      </form>
    </section>
  );
};

export default Login;
