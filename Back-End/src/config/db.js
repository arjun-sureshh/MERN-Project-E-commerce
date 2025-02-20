const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://arjunsuresh410:arjunsuresh410@cluster0.kbzr3.mongodb.net/db-e-commerce');

        console.log('Mongo DB connected');
    } catch (error) {
        console.error('error connecting to MongoDB', error);
        process.exit(1);
    }

};

module.exports = connectDB;