import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect.js"
import bodyParser from "body-parser"
import trascationRouter from "./routes/trascationRouter.js"
import cors from "cors"


// Configuations
const app = express()
dotenv.config()
dbConnect();
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

app.use("/", trascationRouter)

app.listen(PORT, () => {
    console.log("Server is running...")
})