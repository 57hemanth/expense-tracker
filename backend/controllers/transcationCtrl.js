import Transcation from "../models/transcationModel.js"

const getAllTranscations = async (req, res) => {
    try {
        const transcations = await Transcation.find()
        res.json({ status: 200, data: transcations })
    } catch(err) {
        console.log(err)
        res.json({ status: 400, message: err.message })
    }
}

const createTranscation = async (req, res) => {
    try {
        const transcation = await Transcation.create(req.body)
        res.send({ status: 200, data: { transcation }})
    } catch(err) {
        res.send({ status: 400, message: err.message })
    }
}

export { createTranscation, getAllTranscations }