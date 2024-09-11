import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "./hooks/useAuth";

const RequireAuth = () => {
  const { authentication } = useAuth();
  const location = useLocation();

  return authentication?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
