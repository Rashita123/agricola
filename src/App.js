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
import { Admin, AdminLogin, AdminPrivateRoute } from "./admin";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/global";
import { USER_PROFILE } from "./utilities/constants";
import { PrivateRoute } from "./PrivateRoute";
function App() {
  return (
    <div className="App">
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
          <Route path={`/${USER_PROFILE.KYC_PATH}`} element={<ProfilePage />} />
        </Route>

        <Route path="/" element={<AdminPrivateRoute />}>
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
