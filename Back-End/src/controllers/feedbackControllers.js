
const Feedback = require("../models/feedbackModels");

//  get Feed Back
const getFeedBack = async (req,res) =>{
    try {
        const feedbackDetails = await Feedback.find();
        res.status(200).json(feedbackDetails)
    } catch (error) {
        res.status(500).json({messgae:"Error in fetching User FeedBack ", error})
    }
}

//  create FeedBack

const createFeedBack = async (req, res) => {

    const { ratting, discription, title, cartId } = req.body;
    // const {categoryId} =req.params.id;
    
    try {
       
        const newFeedback = new Feedback({
            ratting, discription, title, cartId 
        })
        await newFeedback.save();
        res.status(201).json({ message: "FeedBack  successfully created " })

    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    createFeedBack,
    getFeedBack
}