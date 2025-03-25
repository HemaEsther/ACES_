import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        // await mongoose.connect(`mongodb+srv://ahmadkaif:aces123@clusteronestop.l6rlh.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOneStop`)
        console.log("DB Connected!!!")
    } catch (error) {   
        console.log(`Error in DB Connection : `, error.message);
        process.exit(1);
    }
}
export default connectDB;