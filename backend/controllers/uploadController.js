const path = require("path");

const { detectViolation } = require("../services/detectorService");

const deleteFile = require("../utils/deleteFile");

const uploadFile = async (req, res) => {
    console.log("entered the uploadFile module")
    let filePath = null;
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "no file uploaded."
            });
        }

        filePath = path.resolve(req.file.path);
        console.log("going to call for detection")
        const result = await detectViolation(filePath);
        console.log("fetched the detection")
        deleteFile(filePath);

        return res.json({
            status: result.status,
            violation: result.violation,
            violation_types: result.violation_types,
            image: result.image
        });
    } catch (err) {
        console.log(err);

        deleteFile(filePath);

        return res.status(500).json({
            status: "error",
            message: "Detection failed."
        });
    }
}

module.exports = uploadFile;