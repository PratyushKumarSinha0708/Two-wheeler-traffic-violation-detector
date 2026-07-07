const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, uploadDir);
    },
     
    filename(req, file, cb) {

        const filename = Date.now() +
            path.extname(file.originalname);

        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = [
        "image/jpeg",
        "image/png",
        "image/jpg",

        "video/mp4",
        "video/mov",
        "video/avi",
        "video/x-msvideo",
        "video/quicktime"
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

module.exports = multer({
    storage,
    fileFilter
});