import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthenticationContext } from "../../context/AuthenticationContext";
import { ACTIONS } from "../../reducers/AuthenticationReducer";
import { userLogin } from "../../api/user";
import { USER_PROFILE } from "../../utilities/constants";
import Alert from "@mui/material/Alert";

import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

export const LoginRightBar = () => {
  const navigate = useNavigate();
  const { userState, userDispatch } = UseAuthenticationContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);
  const [connected, setConnected] = useState(false);
  const [helperText, setHelperText] = useState({ display: false, message: "" });

  const injectedConnector = new InjectedConnector({ supportedChainIds: [80001, 31337, 1337] })
  const { activate, active } = useWeb3React()

  useEffect(() => {
    if (localStorage.getItem("metamask-account")) {
      setMetamask(localStorage.getItem("metamask-account"));
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [selectedAccount, accountBalance, userState.selectedMetamaskAccount]);
  const setBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        const receivedBalance = ethers.utils.formatEther(balance);
        setAccountBalance(receivedBalance);
        userDispatch({
          type: ACTIONS.UPDATE_BALANCE,
          payload: { accountBalance: receivedBalance },
        });
      });
  };
  const setMetamask = (account) => {
    setSelectedAccount(account);
    userDispatch({
      type: ACTIONS.UPDATE_METAMASK,
      payload: { selectedMetamaskAccount: selectedAccount },
    });
    setBalance(account);
  };
  useEffect(() => {
    if (active && window.ethereum) {
      window.ethereum.enable().then(() => console.log('enabled'))
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (result) => {
          const address = result[0];
          console.log({ address })

          const res = await userLogin(address);
          console.log({ res })
          if (res.message) {
            setHelperText({ display: true, message: res.message });
          } else {
            localStorage.setItem("accessToken", res.accessToken);
            setMetamask(address);
            localStorage.setItem("metamask-account", address);
            setConnected(true);
            navigate(`/${USER_PROFILE.PROFILE_PATH}`);
          }
        });
    } else {
      setErrorMessage("Install Metamask to continue");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
  const handleConnect = async () => {
    console.log('handleConnect')
    await activate(injectedConnector, e => console.log(e), true)
    console.log('web3 active', active)

  };
  window.ethereum.on("accountsChanged", () => window.location.reload());
  return (
    <div className="w-2/3 ml-5  rounded-xl">
      <div className="w-3/5 m-auto flex flex-col justify-around py-5 text-white">
        {helperText.display ? (
          <Alert severity="error">{helperText.message}</Alert>
        ) : null}
        <div className="flex flex-col items-start p-3">
          <heading className="font-semibold text-3xl mb-3">Login</heading>
        </div>
        <button
          disabled={connected}
          onClick={handleConnect}
          className="cursor-pointer text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md disabled:bg-gray-700 disabled:cursor-not-allowed mb-4"
        >
          Connect To Metamask
        </button>
        {errorMessage && <span>{errorMessage}</span>}
        {userState.selectedMetamaskAccount && `Account: {<span>{userState.selectedMetamaskAccount}</span>}`}
        {userState.accountBalance && `Balance: {<span>{userState.accountBalance}</span>}`}
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
        <Link to="/adminlogin">
          <button className="text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md">
            Login as Admin
          </button>
        </Link>
      </div>
    </div>
  );
};
