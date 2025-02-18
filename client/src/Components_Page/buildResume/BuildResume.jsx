import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ModernTemplate from "./templates/modernTemplate";
import ClassicTemplate from "./templates/classicTemplate";
import { useReactToPrint } from "react-to-print";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  linkedin: yup.string().url("Enter a valid LinkedIn URL").required("LinkedIn is required"),
  github: yup.string().url("Enter a valid GitHub URL").required("GitHub is required"),
  summary: yup.string().required("Summary is required"),
  experienceTitle: yup.string().required("Job title is required"),
  company: yup.string().required("Company name is required"),
  duration: yup.string().required("Duration is required"),
  experience: yup.string().required("Experience description is required"),
  degree: yup.string().required("Degree is required"),
  university: yup.string().required("University name is required"),
  year: yup.string().required("Graduation year is required"),
  skills: yup.string().required("Skills are required"),
});

const Resume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      summary: "Experienced software developer skilled in React and Node.js.",
      experienceTitle: "Frontend Developer",
      company: "Tech Corp",
      duration: "2021 - Present",
      experience: "Developed and maintained React applications.",
      degree: "B.Sc in Computer Science",
      university: "XYZ University",
      year: "2017 - 2021",
      skills: "React, JavaScript, Node.js, MongoDB, Git",
    },
  });

  const details = watch();
  const resumeRef = useRef();

  // Function to handle PDF download
  const handleDownload = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "Resume",
  });



  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Template Selector */}
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          onClick={() => setSelectedTemplate("modern")} 
          className={`px-4 py-2 rounded ${selectedTemplate === "modern" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Modern
        </button>
        <button 
          onClick={() => setSelectedTemplate("classic")} 
          className={`px-4 py-2 rounded ${selectedTemplate === "classic" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Classic
        </button>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Input Form */}
        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Enter Your Details</h2>
          <form className="space-y-3">
            <input {...register("name")} placeholder="Full Name" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.name?.message}</p>

            <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.email?.message}</p>

            <input {...register("phone")} placeholder="Phone" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.phone?.message}</p>

            <input {...register("linkedin")} placeholder="LinkedIn Profile" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.linkedin?.message}</p>

            <input {...register("github")} placeholder="GitHub Profile" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.github?.message}</p>

            <textarea {...register("summary")} placeholder="Summary" className="w-full p-2 border rounded"></textarea>
            <p className="text-red-500">{errors.summary?.message}</p>

            <h3 className="text-md font-semibold">Experience</h3>
            <input {...register("experienceTitle")} placeholder="Job Title" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.experienceTitle?.message}</p>

            <input {...register("company")} placeholder="Company" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.company?.message}</p>

            <input {...register("duration")} placeholder="Duration" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.duration?.message}</p>

            <textarea {...register("experience")} placeholder="Describe your role" className="w-full p-2 border rounded"></textarea>
            <p className="text-red-500">{errors.experience?.message}</p>

            <h3 className="text-md font-semibold">Education</h3>
            <input {...register("degree")} placeholder="Degree" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.degree?.message}</p>

            <input {...register("university")} placeholder="University" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.university?.message}</p>

            <input {...register("year")} placeholder="Year" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.year?.message}</p>

            <h3 className="text-md font-semibold">Skills</h3>
            <input {...register("skills")} placeholder="Skills (comma-separated)" className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.skills?.message}</p>
          </form>
        </div>

        {/* Right Side - Resume Preview */}
       {/* Resume Preview Section */}
<div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow border">
  <h2 className="text-lg font-semibold mb-4">Resume Preview</h2>
  {/* Apply ref directly here */}
  <div ref={resumeRef}>
    {selectedTemplate === "modern" ? (
      <ModernTemplate details={details} />
    ) : (
      <ClassicTemplate details={details} />
    )}
  </div>
  {/* Download Button */}
  <button 
    onClick={handleDownload} 
    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg w-full text-center"
  >
    Download PDF
  </button>
</div>

      </div>
    </div>
  );
};

export default Resume;
