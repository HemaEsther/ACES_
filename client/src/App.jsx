import { LandingPage } from "./pages";
import "./App.css";
import Login from "./Components_Page/Login";
import Signup from "./Components_Page/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Components_Page/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

import ATSScorePage from "./Components_Page/ATSScorePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ats" element={<ATSScorePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
