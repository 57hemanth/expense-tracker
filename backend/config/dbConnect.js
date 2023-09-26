import mongoose from "mongoose"

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connection successful")
    } catch(err) {
        console.log(err)
    }
}

export default dbConnect