import express from "express"
import { createTranscation, getAllTranscations } from "../controllers/transcationCtrl.js"

const trascationRouter = express.Router()

trascationRouter.get("/", getAllTranscations)
trascationRouter.post("/new", createTranscation)

export default trascationRouter