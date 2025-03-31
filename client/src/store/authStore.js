import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const API_BASE_URL = "http://localhost:5000/api/auth";

const useAuthStore = create(
  persist((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    fetchUser: async () => {
      set({ loading: true }); // Start loading
      try {
        const response = await axios.get(`${API_BASE_URL}/me`, {
          withCredentials: true,
        });
        // Only update if user was previously null (prevents duplicate login toast)
        set((state) => ({
          user: response.data,
          isAuthenticated: state.isAuthenticated || !!response.data, // Only update if authentication state is false
          loading: false,
        }));
      } catch (error) {
        console.log(error);
        set({ user: null, isAuthenticated: false, loading: false });
      }
    },

    signup: async (userData) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/signup`,
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
        await axios.post(`${API_BASE_URL}/login`, credentials, {
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
        await axios.post(
          `${API_BASE_URL}/logout`,
          {},
          { withCredentials: true }
        );
        set({ user: null, isAuthenticated: false });
      } catch (error) {
        console.error("Logout failed:", error.response?.data?.message);
      }
    },
  }))
);

export default useAuthStore;
