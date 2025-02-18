import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { LandingPage } from "./pages";
import Login from "./Components_Page/Login";
import Signup from "./Components_Page/Signup";
import Dashboard from "./Components_Page/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ATSScorePage from "./Components_Page/checkATS/ATSScorePage";
import BuildResume from "./Components_Page/buildResume/BuildResume";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // Check if user is logged in when app starts
  }, [fetchUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ats" element={<ATSScorePage />} />
          <Route path="/buildresume" element={<BuildResume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
