import { createContext, useContext, useReducer } from "react";
import { authenticationReducer } from "../reducers/AuthenticationReducer";

const authenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [ userState, userDispatch ] = useReducer(authenticationReducer, {
        username: "",
        password: "",
        selectedMetamaskAccount: null,
        accountBalance: null,
        loginAsAdmin: false,
    })
    return(
        <authenticationContext.Provider value={{userState, userDispatch}}>
            {children}
        </authenticationContext.Provider>
    )
} 

export const UseAuthenticationContext = () => {
    return useContext(authenticationContext);
}