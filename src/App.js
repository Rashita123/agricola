import "./App.css";
import { Register, Login, ProfilePage } from "./pages";
import { Routes, Route, Link } from "react-router-dom";
import Example, { Navbar } from "./components/UI/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
