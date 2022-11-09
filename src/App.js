import "./App.css";
import {
  Register,
  Login,
  ProfilePage,
  Lender,
  Staker,
  Borrower,
  Landing,
} from "./pages";
import { Admin, AdminLogin, AdminPrivateRoute } from "./admin";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/global";
import { USER_PROFILE } from "./utilities/constants";
import { PrivateRoute } from "./PrivateRoute";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { fetchUserDetails } from "./api/user";
import { ACTIONS } from "./reducers/AuthenticationReducer";
import { UseAuthenticationContext } from "./context/AuthenticationContext";
import { useEffect } from "react";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  const { userState, userDispatch } = UseAuthenticationContext();
  useEffect(() => {
    const fetchProfile = async () => {
      const result = await fetchUserDetails();
      if (!result.error) {
        userDispatch({
          type: ACTIONS.UPDATE_PROFILE_DATA,
          payload: result.userDetails,
        });
      }
    };

    if (localStorage.getItem("accessToken")) {
      fetchProfile();
    }
  }, []);
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Navbar />
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/lend" element={<Lender />} />
            <Route path="/stake" element={<Staker />} />
            <Route path="/borrow" element={<Borrower />} />
            <Route
              path={`/${USER_PROFILE.PROFILE_PATH}`}
              element={<ProfilePage />}
            />
            <Route
              path={`/${USER_PROFILE.KYC_PATH}`}
              element={<ProfilePage />}
            />
          </Route>

          <Route path="/" element={<AdminPrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
