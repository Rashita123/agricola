import { UseAuthenticationContext } from "./context/AuthenticationContext";
import { Route, Navigate } from "react-router-dom";
export const PrivateRoute = ({ path, ...props }) => {
    const { userState } = UseAuthenticationContext();
  return userState.loginAsAdmin ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/adminlogin" />
  );
};
