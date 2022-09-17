import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthenticationContext } from "../../context/AuthenticationContext";
import { ACTIONS } from "../../reducers/AuthenticationReducer";
import { userLogin } from "../../api/user";
import { USER_PROFILE } from "../../utilities/constants";
import Alert from "@mui/material/Alert";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export const LoginRightBar = () => {
  const navigate = useNavigate();
  const { userState, userDispatch } = UseAuthenticationContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);
  const [connected, setConnected] = useState(false);
  const [helperText, setHelperText] = useState({ display: false, message: "" });

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [80001],
  });
  const { activate, active } = useWeb3React();

  useEffect(() => {
    if (window.ethereum) {
      console.log("first effect");
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => setUserAccountDetails(res[0]));
    }
  }, []);

  const setUserAccountDetails = (account) => {
    // Setting an address data
    setSelectedAccount(account);
    userDispatch({
      type: ACTIONS.UPDATE_METAMASK,
      payload: { selectedMetamaskAccount: selectedAccount },
    });

    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [account, "latest"],
      })
      .then((balance) => {
        // Setting balance
        const receivedBalance = ethers.utils.formatEther(balance);
        setAccountBalance(receivedBalance);
        userDispatch({
          type: ACTIONS.UPDATE_BALANCE,
          payload: { accountBalance: receivedBalance },
        });

        console.log("address, balance-> ", account, balance);
      });
  };

  useEffect(() => {
    console.log("using localstorage ");
    if (localStorage.getItem("metamask-account")) {
      setMetamask(localStorage.getItem("metamask-account"));
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [selectedAccount, accountBalance, userState.selectedMetamaskAccount]);

  const setMetamask = (account) => {
    setSelectedAccount(account);
    userDispatch({
      type: ACTIONS.UPDATE_METAMASK,
      payload: { selectedMetamaskAccount: selectedAccount },
    });
    setBalance(account);
  };

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

  // this useEffect can be shifted in the handleConnect method inside then blocl
  useEffect(() => {
    console.log(window.ethereum, active);
    if (active && window.ethereum) {
      window.ethereum.enable().then(() => console.log("enabled"));
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (result) => {
          const address = result[0];

          const { accessToken, userDetails, message } = await userLogin(
            address
          );
          if (message) {
            setHelperText({ display: true, message: message });
          } else {
            localStorage.setItem("accessToken", accessToken);
            setMetamask(address);
            localStorage.setItem("metamask-account", address);
            setConnected(true);
            userDispatch({
              type: ACTIONS.UPDATE_PROFILE_DATA,
              payload: userDetails,
            });
            navigate(`/${USER_PROFILE.PROFILE_PATH}`);
          }
        });
    } else {
      // setErrorMessage("Install Metamask to continue");
      console.log("active false or window.ethereum undefined");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleConnect = async () => {
    console.log("handleConnect");
    activate(injectedConnector).then((result) => {
      console.log("ACTIVE STATUS, ", active, selectedAccount, result);
    });
    console.log("web3 active", active);
  };

  window.ethereum.on("accountsChanged", () => window.location.reload());

  const fetchUserDetails = (event) => {
    event.preventDefault();

    console.log(userState);
  };

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
        <button
          onClick={fetchUserDetails}
          className="cursor-pointer text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md disabled:bg-gray-700 disabled:cursor-not-allowed mb-4"
        >
          fetch user data in console
        </button>
        {errorMessage && <span>{errorMessage}</span>}
        {/* {userState.selectedMetamaskAccount &&
          `Account: ${userState.selectedMetamaskAccount}`}
        {userState.accountBalance && `Balance: ${userState.accountBalance}`} */}

        <Link to="/adminlogin">
          <button className="text-white bg-sky-500 hover:bg-sky-800 hover:text-gray-200 w-fit py-3 px-5 rounded-md">
            Login as Admin
          </button>
        </Link>
      </div>
    </div>
  );
};
