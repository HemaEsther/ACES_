import mongoose from "mongoose";

const latexSchema = new mongoose.Schema(
  {
   projectId: {
    type: string,
    unique: true,
    required: true
   },
   title: {
    type: string,
    required: true
   },
   content: {
    type: string,
    required: true
   }
  },
  { timestamps: true }
);

const Latex = mongoose.model("Latex", latexSchema);
export default Latex;
