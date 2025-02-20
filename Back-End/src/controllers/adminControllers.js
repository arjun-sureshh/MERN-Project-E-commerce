const Admin = require("../models/adminModels");
const bcrypt = require("bcrypt");


// admin get 
const getAdmin = async (req, res) => {
    try {
        const adminDetails = await Admin.find();
        res.status(200).json(adminDetails);

    } catch (error) {
        res.status(500).json({ message: "Error in fetching admin ", error })
    }
}

// get Admin By ID

const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const findData = await Admin.findById(id);
        if (findData) {
            res.status(200).json({ message: "got the Admin Details ", data: findData })
        } else {
            res.status(404).json({ message: "requested Admin Details is not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error in fetching Admin ", error })
    }
}


// admin post
const createAdmin = async (req, res) => {
    const { adminName, adminEmail, adminPassword } = req.body;

    if (!adminName || !adminEmail || !adminPassword) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }

    try {
        const existingAdmin = await Admin.findOne({ adminEmail });
        if (existingAdmin) {
            console.log("admin");
            
            return res.status(400).json({ message: "This email is already exists " })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(adminPassword, salt); // Hash the password

        // Create new admin with hashed password
        const newAdmin = new Admin({
            adminName,
            adminEmail,
            adminPassword: hashedPassword // Store the hashed password
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created succeccfully" });
    } catch (error) {
        console.error(error)

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "server error" })
    }

};


// delete Admin  
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Admin.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "Admin Account  not found" });
        } else {
            res.json({ message: "Admin Account deleted successfully", deleted });
        }

    } catch (error) {
        console.error("Error deleting in Admin Account:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//  update Brand by id 

const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminName, adminEmail } = req.body;
        const findItem = await Admin.findById(id);

        const existingAdmin = await Admin.findOne({ adminEmail });
        if (existingAdmin) {
            
            return res.status(400).json({ message: "This email is already exists " })
        }

        if (findItem) {
            const updateItem = await Admin.findByIdAndUpdate(
                id,
                { adminName, adminEmail },
                { new: true }
            );
        if(adminName && !adminEmail){
            res.status(201).send({ message: "Admin Name Changed", updateItem });
        }else if(adminEmail && !adminName) {
            res.status(201).send({ message: "Admin Email Changed", updateItem });
        }else if(adminName && adminEmail){
            res.status(201).send({ message: "Admin Name And email Changed", updateItem });
        } else {
            res.status(201).send({ message: "required admin email and name for change",});
        }
            
        } else {
            res.status(404).json({ message: "Admin account is not found " })
        }
    } catch (error) {
        console.error("Error updateing in Policy Method:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createAdmin,
    getAdmin,
    getAdminById,
    deleteAdmin,
    updateAdmin
}

