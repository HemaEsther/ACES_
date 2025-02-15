import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  fetchUser: async () => {
    set({ loading: true }); // Start loading
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      set({ user: response.data, isAuthenticated: true, loading: false });
    } catch (error) {
      console.log(error)
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData,
        { withCredentials: true }
      );
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message);
      throw error; // Ensure error is caught in the component
    }
  },
  

  login: async (credentials) => {
    set({ loading: true }); // Start loading
    try {
      await axios.post("http://localhost:5000/api/auth/login", credentials, {
        withCredentials: true,
      });
      await useAuthStore.getState().fetchUser();
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
    } finally {
      set({ loading: false }); // Stop loading
    }
  },

  logout: async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message);
    }
  },
}));

export default useAuthStore;
