import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Add login logic here (API call, validation, etc.)
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
    // Implement Google Sign-In logic (OAuth, Firebase Auth, etc.)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Please log in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition font-semibold"
          >
            Login
          </button>
        </form>

        <div className="relative mt-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <span className="relative bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
            OR
          </span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 py-3 rounded-lg mt-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google Logo"
            className="h-5 w-5"
          />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Sign in with Google
          </span>
        </button>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
