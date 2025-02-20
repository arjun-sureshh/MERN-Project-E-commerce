const mongoose = require("mongoose")

const adminSchemaStructure = new mongoose.Schema({
    adminName :{
        type:String,
        require:true,
        trim:true,
    },
    adminEmail:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/^\S+@\S+\.\S+$/,"Please use a valid email address"],
    },
    adminPassword:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    //     validate: {
    //         validator: function (password) {
    //           const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    //           return strongPasswordRegex.test(password);
    //         },
    //          message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.',
    // }
    },
},{timestamps:true})

const Admin = mongoose.model("admin",adminSchemaStructure)

module.exports = Admin