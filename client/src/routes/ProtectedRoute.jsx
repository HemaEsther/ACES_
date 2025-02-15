// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


// import { Navigate, Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProtectedRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
//       .then((res) => setIsAuthenticated(true))
//       .catch(() => setIsAuthenticated(false));
//   }, []);

//   if (isAuthenticated === null) return <p>Loading...</p>; // Prevents flickering

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>; // Show a loader while checking auth
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
