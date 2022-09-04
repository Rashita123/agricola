import "./App.css";
import {
  Register,
  Login,
  ProfilePage,
  Lender,
  Staker,
  Borrower,
  Landing
} from "./pages";
import { Admin, AdminLogin } from "./admin";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/global";
import { USER_PROFILE } from "./utilities/constants";
import { PrivateRoute } from "./PrivateRoute";
import { UseAuthenticationContext } from "./context/AuthenticationContext";
function App() {
  const { userState } = UseAuthenticationContext();
  return (
    <div className="App">
      <Navbar />
      {/* <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lend" element={<Lender />} />
        <Route path="/stake" element={<Staker />} />
        <Route path="/borrow" element={<Borrower />} />
        {userState.loginAsAdmin && <Route path="/admin" element={<Admin/>}/> }
        <Route path="/adminlogin" element={<AdminLogin/>}/> */}
      {/* <PrivateRoute path="/admin"
          element={<Admin />}/> */}
      {/* <Route
          path={`/${USER_PROFILE.PROFILE_PATH}`}
          element={<ProfilePage />}
        />
        <Route path={`/${USER_PROFILE.KYC_PATH}`} element={<ProfilePage />} />
      </Routes> */}
      {/* <Route path="/" element={<Home/>}/> */}
      {/* <Route path="/" element={<PrivateRoute />}>
        <Route element={< Home />}/>
      </Route> */}

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
          <Route path={`/${USER_PROFILE.KYC_PATH}`} element={<ProfilePage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
