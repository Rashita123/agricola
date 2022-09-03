import { Outlet, useLocation, Navigate, Route } from "react-router-dom";
import { UseAuthenticationContext } from "./context/AuthenticationContext";

// export const PrivateRoute = ({ path, ...props }) => {
//   const { userState } = UseAuthenticationContext();
//   return userState.loginAsAdmin ? (
//     <Route path={path} {...props} />
//   ) : (
//     <Navigate state={{ from: path }} replace to="/adminlogin" />
//   );
// };

export const PrivateRoute = (path) => {
  const location = useLocation();
  const account = localStorage.getItem("accessToken");

  return account ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
  // const { userState } = UseAuthenticationContext();
  // console.log("userState.loginAsAdmin: ", userState.loginAsAdmin);
  // if (userState.loginAsAdmin) {
  //   return <Navigate to="/admin" state={{ from: location }} />;
  // } else {
  //   return account ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} />
  //   );
  // }
};
