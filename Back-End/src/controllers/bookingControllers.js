const Booking = require("../models/bookingModules");


// Orders get 
const getBooking = async (req, res) => {
    try {
        const bookingDetails = await Booking.find();
        res.status(200).json(bookingDetails);

    }catch (error) {
        res.status(500).json({ message: "Error in fetching Booking details ", error })
    }
}

// Order post

const createBooking = async (req, res) => {
    const { amount, userId } = req.body;

    if (!amount || !userId) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
       
        const newBooking = new Booking({
            amount, userId
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking List added succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};

module.exports = {
    createBooking,
    getBooking
}

