import { useState } from "react";
import { ethers } from "ethers";
import { UseAuthenticationContext } from "../../context/AuthenticationContext";
import { ACTIONS } from "../../reducers/AuthenticationReducer";
export const LoginRightBar = () => {
    const { userState, userDispatch } = UseAuthenticationContext();
    const [ errorMessage, setErrorMessage ] = useState(null); 
    const [ selectedAccount, setSelectedAccount ] = useState(null);
    const [ accountBalance, setAccountBalance ] = useState(0);
    const setBalance = (account) => {
        window.ethereum.request({method: "eth_getBalance" , params: [account, "latest"]})
            .then(balance => {
                setAccountBalance(ethers.utils.formatEther(balance));
            })
    }
    const handleConnect = () => {
        if(window.ethereum){
            window.ethereum.request({method: "eth_requestAccounts"})
            .then(result => {
                setSelectedAccount(result[0]);
                userDispatch({
                    type: ACTIONS.UPDATE_METAMASK,
                    payload: { selectedMetamaskAccount: selectedAccount }
                })
                setBalance(result[0])
            })
        }else{
            setErrorMessage("Install Metamask to continue");
        }
    }
    window.ethereum.on('accountsChanged', () => window.location.reload());
    return(
        <div className="w-2/3 ml-5  rounded-xl">
            <div className="w-3/5 m-auto flex flex-col justify-around py-5 text-white">
                <div className="flex flex-col items-start">
                    <heading className="font-semibold text-3xl mb-3">Login</heading>
                </div>
                <button onClick={handleConnect} className="text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md">Connect To Metamask</button>
                {errorMessage && <span>{errorMessage}</span>}
                Account: {selectedAccount && <span>{selectedAccount}</span>}
                Balance: {accountBalance && <span>{accountBalance}</span>}
                    {/* <form className="flex flex-col justify-between items-stretch text-left">
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
                    </form> */}

                {/* <button className="text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md" 
                onClick={handleLogin}
                >Login</button> */}
            </div>
        </div>
    )
}