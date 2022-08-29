import { createContext, useContext } from "react";

const authenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    return(
        <authenticationContext.Provider value={{ "name": "Rashita"}}>
            {children}
        </authenticationContext.Provider>
    )
} 

export const UseAuthenticationContext = () => {
    return useContext(authenticationContext);
}