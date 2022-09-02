import "./App.css";
import {
  Register,
  Login,
  ProfilePage,
  Lender,
  Staker,
  Borrower,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/global";
import { USER_PROFILE } from "./utilities/constants";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lend" element={<Lender />} />
        <Route path="/stake" element={<Staker />} />
        <Route path="/borrow" element={<Borrower />} />
        <Route
          path={`/${USER_PROFILE.PROFILE_PATH}`}
          element={<ProfilePage />}
        />
        <Route path={`/${USER_PROFILE.KYC_PATH}`} element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
