import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const API_BASE_URL = "http://localhost:5000/api/resume";

const useResumeStore = create(
  persist(
    (set, get) => ({
      step: 1,
      personalInfo: { name: "", email: "", phone: "", linkedin: "", github: "" },
      skills: [],
      experience: [],
      projects: [],
      education: [],
      loading: false,

      // 🔹 State Setters
      setPersonalInfo: (data) => set({ personalInfo: data }),
      setSkills: (data) => set({ skills: data }),
      setExperience: (data) => set({ experience: data }),
      setProjects: (data) => set({ projects: data }),
      setEducation: (data) => set({ education: data }),

      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),

      // 🔹 API Requests

      // 1️⃣ Save Resume (POST)
      saveResume: async () => {
        set({ loading: true });
        try {
          const { personalInfo, skills, experience, projects, education } = get();
          const resumeData = { personalInfo, skills, experience, projects, education };

          const response = await axios.post(`${API_BASE_URL}/save`, resumeData, {
            withCredentials: true, // Automatically sends HttpOnly cookies
          });

          set({ loading: false });
          return response.data;
        } catch (error) {
          console.error("🚨 Save Resume Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },

      // 2️⃣ Get Resume (GET)
      fetchResume: async () => {
        set({ loading: true });
        try {
          const response = await axios.get(`${API_BASE_URL}/get`, {
            withCredentials: true,
          });

          set({ ...response.data, loading: false });
        } catch (error) {
          console.error("🚨 Fetch Resume Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },

      // 3️⃣ Update Resume (PATCH)
      updateResume: async () => {
        set({ loading: true });
        try {
          const { personalInfo, skills, experience, projects, education } = get();
          const updatedData = { personalInfo, skills, experience, projects, education };

          const response = await axios.patch(`${API_BASE_URL}/update`, updatedData, {
            withCredentials: true,
          });

          set({ loading: false });
          return response.data;
        } catch (error) {
          console.error("🚨 Update Resume Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },

      // 4️⃣ Download Resume as PDF (GET)
      downloadResume: async () => {
        set({ loading: true });
        try {
          const response = await axios.get(`${API_BASE_URL}/download`, {
            withCredentials: true,
            responseType: "blob",
          });

          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url); // Cleanup memory

          set({ loading: false });
        } catch (error) {
          console.error("🚨 Download Resume Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },
    }),
    {
      name: "resume-storage", // Persist data locally
    }
  )
);

export default useResumeStore;
