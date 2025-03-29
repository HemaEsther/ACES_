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
      resumes: [],
      currentResumeId: null, // Track the current resume
      loading: false,

      // 🔹 State Setters
      setPersonalInfo: (data) => set({ personalInfo: data }),
      setSkills: (data) => set({ skills: data }),
      setExperience: (data) => set({ experience: data }),
      setProjects: (data) => set({ projects: data }),
      setEducation: (data) => set({ education: data }),

      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      setStep: (step) => set({ step }), // Add this

      loadResume: (resume) => {
        set({
          personalInfo: resume.personalInfo,
          skills: resume.skills,
          experience: resume.experience,
          projects: resume.projects,
          education: resume.education,
          currentResumeId: resume._id,
        });
      },

      resetForm: () => set({
        step: 1,
        personalInfo: { name: "", email: "", phone: "", linkedin: "", github: "" },
        skills: [],
        experience: [],
        projects: [],
        education: [],
        currentResumeId: null,
      }),

      // 🔹 API Requests

      saveResume: async () => {
        set({ loading: true });
        try {
          const { personalInfo, skills, experience, projects, education } = get();
          const resumeData = { personalInfo, skills, experience, projects, education };
          const response = await axios.post(`${API_BASE_URL}/save`, resumeData, {
            withCredentials: true,
          });
          set({
            currentResumeId: response.data.resumeId,
            loading: false,
          });
          get().fetchALLResume(); // Keep resumes list updated
          return response.data;
        } catch (error) {
          console.error("🚨 Save Resume Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },

      fetchResume: async (resumeId) => {
        if (!resumeId) {
          console.warn("Skipping fetch: No resumeId yet (new resume)");
          return; // Exit early for new resumes
        }
        set({ loading: true });
        try {
          const response = await axios.get(`${API_BASE_URL}/get/${resumeId}`, {
            withCredentials: true,
          });
          const { personalInfo, skills, experience, projects, education, _id } = response.data;
          set({
            personalInfo,
            skills,
            experience,
            projects,
            education,
            currentResumeId: _id,
            loading: false,
          });
        } catch (error) {
          console.error("🚨 Fetch Resume Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },

      fetchALLResume: async () => {
        set({ loading: true });
        try {
          const response = await axios.get(`${API_BASE_URL}/getAll`, {
            withCredentials: true,
          });
          set({
            resumes: response.data.resumes,
            loading: false,
          });
        } catch (error) {
          console.error("🚨 Fetch All Resumes Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },

      updateResume: async (resumeId) => {
        if (!resumeId) {
          console.warn("Skipping update: No resumeId yet (new resume)");
          return; // Exit early for new resumes
        }
        set({ loading: true });
        try {
          const { personalInfo, skills, experience, projects, education } = get();
          const updatedData = { personalInfo, skills, experience, projects, education };
          // console.log("Updating resumeId:", resumeId, "with data:", JSON.stringify(updatedData, null, 2));
          const response = await axios.patch(`${API_BASE_URL}/update/${resumeId}`, updatedData, {
            withCredentials: true,
          });
          // console.log("Update response:", JSON.stringify(response.data, null, 2));
          const { personalInfo: updatedPersonalInfo, skills: updatedSkills, experience: updatedExperience, projects: updatedProjects, education: updatedEducation } = response.data.resume || {};
          set({
            personalInfo: updatedPersonalInfo || personalInfo,
            skills: updatedSkills || skills,
            experience: updatedExperience || experience,
            projects: updatedProjects || projects,
            education: updatedEducation || education,
            loading: false,
          });
          get().fetchALLResume();
          return response.data;
        } catch (error) {
          console.error("🚨 Update Resume Error:", {
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
          set({ loading: false });
          throw error;
        }
      },

      deleteResume: async (resumeId) => { // New method
        set({ loading: true });
        try {
          await axios.delete(`${API_BASE_URL}/delete/${resumeId}`, {
            withCredentials: true,
          });
          set({ loading: false });
          // Remove the deleted resume from the local state
          set((state) => ({
            resumes: state.resumes.filter((resume) => resume._id !== resumeId),
            currentResumeId: state.currentResumeId === resumeId ? null : state.currentResumeId,
          }));
          get().fetchALLResume(); // Refresh the list from the server
        } catch (error) {
          console.error("🚨 Delete Resume Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },

      downloadResume: async (resumeId) => {
        if (!resumeId) {
          console.warn("Skipping fetch: No resumeId yet (new resume)");
          return; // Exit early for new resumes
        }
        set({ loading: true });
        try {
          const response = await axios.get(`${API_BASE_URL}/download/${resumeId}`, {
            withCredentials: true,
            responseType: "blob",
          });
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `Resume-${resumeId}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          set({ loading: false });
        } catch (error) {
          console.error("🚨 Download Resume Error:", error.response?.data?.message || error.message);
          set({ loading: false });
          throw error;
        }
      },
    }),
    { name: "resume-storage" }
  )
);

export default useResumeStore;