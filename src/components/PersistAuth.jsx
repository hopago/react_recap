import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { authentication, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefresh = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    isMounted && !authentication?.accessToken
      ? verifyRefresh()
      : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(
      `Authentication: ${JSON.stringify(authentication?.accessToken)}`
    );
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>인증 중...</p> : <Outlet />}</>
  );
};

export default PersistAuth;
