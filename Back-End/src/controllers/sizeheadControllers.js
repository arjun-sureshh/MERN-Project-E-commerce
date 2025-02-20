const SizeHead = require("../models/sizeHeadModels");

// get SizeHead
const getSizeHead = async (req,res) =>{
try {
    const sizeHeadDetails = await SizeHead.find();
    res.status(200).json({sizeHeadDetails});
} catch (error) {
    res.status(500).json({ message: "Error in fetching Size ", error })
}
}

// post SizeHead

const createSizeHead = async(req,res) =>{
    const {sizeHeadName} = req.body;
  try {
    let existingSizeHead = await SizeHead.findOne({sizeHeadName})

    if(existingSizeHead){
        return res.status(400).json({message:"This Size  is already exists"})
    }

    const newPolicyMethod = new SizeHead({
        sizeHeadName
    })
    await newPolicyMethod.save();
    res.status(201).json({message:"New Size successfully created"})

  } catch (error) {
    console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    createSizeHead,
    getSizeHead
}