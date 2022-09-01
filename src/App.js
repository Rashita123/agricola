import './App.css';
import { Register, Login, Lender, Staker, Borrower } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lend" element={<Lender />} />
        <Route path="/stake" element={<Staker />} />
        <Route path="/borrow" element={<Borrower />} />
      </Routes>
    </div>
  );
}

export default App;
