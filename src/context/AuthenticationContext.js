import { createContext, useContext, useReducer } from "react";
import { authenticationReducer } from "../reducers/AuthenticationReducer";

const authenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(authenticationReducer, {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    province: "",
    city: "",
    zipcode: "",
    selectedMetamaskAccount: null,
    accountBalance: null,
    loginAsAdmin: false,
    aadhaarNumber: "",
    panNumber: "",
    income: "",
    occupation: "",
    about: "",
    kycCompleted: false,
    kysStatus: "", // (incomplete, pending, completed)
  });
  return (
    <authenticationContext.Provider value={{ userState, userDispatch }}>
      {children}
    </authenticationContext.Provider>
  );
};

export const UseAuthenticationContext = () => {
  return useContext(authenticationContext);
};
