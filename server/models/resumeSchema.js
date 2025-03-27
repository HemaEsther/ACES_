import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    personalInfo: {
        name: String,
        email: String,
        phone: String,
        linkedin: String,
        github: String,
    },
    skills: [String],
    experience: [
        {
            company: String,
            role: String,
            duration: String,
            description: String,
        },
    ],
    projects: [
        {
            title: String,
            description: String,
            link: String,
        },
    ],
    education: [
        {
            school: String,
            degree: String,
            year: String,
        },
    ],
});

export default mongoose.model("Resume", ResumeSchema);
