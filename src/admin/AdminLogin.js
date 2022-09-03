import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterLeftBar } from "../components/RegisterPage";
import { UseAuthenticationContext } from "../context/AuthenticationContext";
import { ACTIONS } from "../reducers/AuthenticationReducer";
export const AdminLogin = () => {
    let navigate = useNavigate();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(null);
    const { userState, userDispatch } = UseAuthenticationContext();
    const handleAdminLogin = () => {
        if(username === "admin" && password === "admin@123"){
            setErrorMessage(null);
            userDispatch({
                type: ACTIONS.LOGIN_AS_ADMIN,
            })
            navigate('/admin');
        }else{
            setErrorMessage("Wrong Credentials");
        }
    }
    return(
        <div className="flex flex-row justify-between items-stretch h-screen p-5 bg-neutral-800">
            <RegisterLeftBar/>
            <div className="w-2/3 ml-5  rounded-xl">
            <div className="w-3/5 m-auto flex flex-col justify-around py-5 text-white">
                <div className="flex flex-col items-start">
                    <heading className="font-semibold text-3xl mb-3">Login as Admin</heading>
                </div>
                    <form className="flex flex-col justify-between items-stretch text-left mt-5">
                    <div>
                            <span>Username</span>
                            <input
                                value={username}
                                type="text"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-300
                                    bg-neutral-700 bg-clip-padding
                                    border border-solid border-gray-600
                                    rounded
                                    transition
                                    ease-in-out
                                    mt-2
                                    mb-5
                                "
                                id="username"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                                />
                        </div>

                        <div>
                            <span>Password</span>
                            <input
                                value={password}
                                type="password"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-300
                                    bg-neutral-700 bg-clip-padding
                                    border border-solid border-gray-600
                                    rounded
                                    transition
                                    ease-in-out
                                    mt-2
                                    mb-5
                                "
                                id="Password"
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>
                        {errorMessage && <span class="text-md text-red-400 mb-5" id="passwordHelp">{errorMessage}</span>}
                    </form>
                    <button onClick={handleAdminLogin} className="text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md" 
                    >Login</button>
 
                    </div>
                    </div>
        </div>
    )
}