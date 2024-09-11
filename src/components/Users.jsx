import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const abortController = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: abortController,
        });

        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
        navigate("/login", {
          state: {
            from: location,
          },
          replace: true,
        });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return (
    <article>
      <h2>유저 리스트</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>아직 가입된 유저가 없습니다</p>
      )}
      <button onClick={() => refresh()}>인증 토큰 발급</button>
    </article>
  );
};

export default Users;
