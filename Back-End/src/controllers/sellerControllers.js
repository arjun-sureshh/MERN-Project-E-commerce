const Seller = require("../models/sellerModels");
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");


// user get

const getSeller = async (req,res) =>{
    try {
        const sellerDetails = await User.find();
        res.status(200).json(sellerDetails)
    } catch (error) {
        res.status(500).json({messgae:"Error in fetching User ", error})
    }
}

// get product bY Id 
const getSellerById = async (req, res) => {
    const { sellerId } = req.params;

    try {
        const sellerDetails = await Seller.findById(sellerId); // Fetch only required fields

        if (!sellerDetails) {
            return res.status(404).json({ message: "seller is  not found with the given ID." });
        }
        
        res.status(200).json({ 
            message: "Seller fetched successfully", 
            data:sellerDetails 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Seller Acount", error });
    }
};

// seller create

const createSeller = async (req, res) => {

    const {  sellerEmail, sellerMobileNumber ,sellerPassword } = req.body;
   
    if ( !sellerEmail || !sellerMobileNumber || !sellerPassword ) {
        return res.status(400).json({ message: "Please Provide Email , Mobile Number , password Fields" })
    }
    try {
        const existingSeller = await Seller.findOne({ sellerEmail })

        if (existingSeller) {
            return res.status(400).json({emailExist:true, message: "Seller is already exists in this email  " })
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sellerPassword, salt);

        const newSeller = new Seller({
            sellerEmail, sellerPassword:hashedPassword, sellerMobileNumber, ListingStatus:2
        })
        await newSeller.save();
        res.status(201).json({ message: "User Created successfully " ,data:newSeller})

    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }
}

// update the full Name and Display Name in to the seller Account 

const updateNametoSeller = async (req,res) =>{
    const {sellerId} = req.params;
    const {sellerName,sellerDisplayName} = req.body;
    

    if ( !sellerName || !sellerDisplayName ) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    try {
        const updateData = await Seller.findByIdAndUpdate(
            sellerId, 
            { sellerName, sellerDisplayName, ListingStatus : 3  }, 
            { new: true, runValidators: true }
        );

        if (!updateData) {
            return res.status(404).json({ message: "Seller Account Not Found" });
        }

        res.status(200).json({ message: "Seller Details successfully Updated", data: updateData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// update balance details such as bank details

const updateBankDetailstoSeller = async (req,res) =>{
    const {sellerId} = req.params;
    const {sellerGST,storeDiscription,bankAccountNo,ifscCode} = req.body;
     

    if ( !sellerGST || !storeDiscription || !bankAccountNo || !ifscCode ) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    try {
        const updateData = await Seller.findByIdAndUpdate(
            sellerId, 
            { sellerGST, storeDiscription,bankAccountNo, ifscCode, ListingStatus : 4  }, 
            { new: true, runValidators: true }
        );

        if (!updateData) {
            return res.status(404).json({ message: "Seller Account Not Found" });
        }

        res.status(200).json({ message: "Seller Details successfully Updated", data: updateData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


// otp generation

// store  OTP temporarily
const otpStorage = {};

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email app password
    }
});

// Generate and send OTP to email
const sendOTP = async (req, res) => {
    const { sellerEmail } = req.body;
    

    if (!sellerEmail) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
       

        // Generate OTP
        const otp = otpGenerator.generate(4, {
            digits: true, 
            upperCaseAlphabets: false, 
            specialChars: false, 
            lowerCaseAlphabets: false // Ensure no lowercase letters
          });
          otpStorage[sellerEmail] = otp;

        // Email message
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: sellerEmail,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent successfully" });

        // Set OTP expiry (optional)
        setTimeout(() => {
            delete otpStorage[sellerEmail];
        }, 300000); // OTP expires in 5 minutes

    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Error sending OTP", error });
    }
};
// Verify OTP
const verifyOTP = (req, res) => {
    const { sellerEmail, otp } = req.body;
    

    if (otpStorage[sellerEmail] === otp) {
        
        res.status(200).json({success: true, message: "OTP verified successfully" });
        delete otpStorage[sellerEmail]; // Remove OTP after use
    } else {

        res.status(400).json({success: false, message: "Invalid or expired OTP" });
    }
};



module.exports = {
    createSeller,
    getSeller,
    updateNametoSeller,
    getSellerById,
    updateBankDetailstoSeller,
    sendOTP,
    verifyOTP
}