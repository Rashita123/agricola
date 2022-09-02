import "./App.css";
import { Register, Login, ProfilePage } from "./pages";
import { Routes, Route, Link } from "react-router-dom";
import Example, { Navbar } from "./components/UI/Navbar";
import { USER_PROFILE } from "./utilities/constants";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
