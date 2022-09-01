import { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthenticationContext } from "../../context/AuthenticationContext";
import { ACTIONS } from "../../reducers/AuthenticationReducer";
export const LoginRightBar = () => {
    const { userState, userDispatch } = UseAuthenticationContext();
    const [ loginCredentials, setLoginCredentials ] = useState({username: "", password: ""});
    const updateUsername = (e) => {
        setLoginCredentials({...loginCredentials, username: e.target.value})
    }
    const updatePassword = (e) => {
        setLoginCredentials({...loginCredentials, password: e.target.value})
    }
    const handleLogin = () => {
        userDispatch({
            type: ACTIONS.UPDATE_USER,
            payload: { loginCredentials }
        })
    }
    return(
        <div className="w-2/3 ml-5  rounded-xl">
            {/* bg-neutral-500 */}
            <div className="w-3/5 m-auto flex flex-col justify-around h-full py-5 text-white">
                <div className="flex flex-col items-start">
                    <heading className="font-semibold text-3xl mb-3">Login</heading>
                    <div className="text-neutral-300">Create a new account? <Link to="/register" className="text-sky-500">Register</Link></div>
                </div>

                    <form className="flex flex-col justify-between items-stretch text-left">
                    <div>
                            <span>Username</span>
                            <input
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
                                onChange={(e) => updateUsername(e)}
                                />
                        </div>

                        <div>
                            <span>Password</span>
                            <input
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
                                onChange={(e) => updatePassword(e)}
                                />
                        </div>
                    </form>

                <button className="text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md" 
                onClick={handleLogin}
                >Create account</button>
            </div>
        </div>
    )
}