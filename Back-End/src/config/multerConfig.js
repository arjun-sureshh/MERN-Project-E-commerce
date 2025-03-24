const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: "./public/images", // Save images in "public/images"
    filename: (req, file, cb) => {
        cb(null, "photo-" + Date.now() + path.extname(file.originalname));
    },
});

// File Filter (Only accept images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"), false);
    }
};

// Multer Upload Middleware (Allow multiple files)
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;
