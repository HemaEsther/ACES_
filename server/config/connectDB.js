import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Ahmad:ahmad123@cluster0.oy2oxiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        // await mongoose.connect(`mongodb+srv://Ahmad:aces123@cluster0.oy2oxiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("DB Connected!!!")
    } catch (error) {   
        console.log(`Error in DB Connection : `, error.message);
        process.exit(1);
    }
}
export default connectDB;