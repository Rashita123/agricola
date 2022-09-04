import { Outlet, useLocation, Navigate } from "react-router-dom";
import { UseAuthenticationContext } from "../context/AuthenticationContext";
export const AdminPrivateRoute = (path) => {
  const location = useLocation();
  const { userState } = UseAuthenticationContext();

  return userState.loginAsAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/adminlogin" state={{ from: location }} />
  );
};
