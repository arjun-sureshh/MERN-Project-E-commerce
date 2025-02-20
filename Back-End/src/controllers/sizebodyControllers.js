
// get Size body
const getSizeBody = async (req,res) =>{
try {
    const sizebodyDetails = await Brand.find();
    res.status(200).json({sizebodyDetails});
} catch (error) {
    res.status(500).json({ message: "Error in fetching Brand ", error })
}
}

// post size Body

const createSizeBody = async(req,res) =>{
    const {size,sizeHeadNameId} = req.body;
  try {
    let existingSize = await Color.findOne({brandName})

    if(existingSize){
        return res.status(400).json({message:"This Size is already exists"})
    }

    const newSize = new Brand({
        size,
        sizeHeadNameId
    })
    await newSize.save();
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
    createSizeBody,
    getSizeBody
}