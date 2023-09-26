import mongoose from "mongoose";

const transcationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: (true, "Name is required")
    },
    price: {
        type: Number,
        required: (true, "Price is required")
    },
    datetime: {
        type: Date,
        required: (true, "Date and time is required")
    },
    description: {
        type: String,
        required: (true, "Description is required")
    }
})

const Transcation = mongoose.model("Transcation", transcationSchema)

export default Transcation