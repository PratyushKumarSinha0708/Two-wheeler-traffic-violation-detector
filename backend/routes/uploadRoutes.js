const express = require('express');

const router = express.Router();

const upload = require('../middlewares/upload')

const  uploadFile  = require("../controllers/uploadController")

router.get("/test", (req,res) => {
    res.status(200).json({
        status: "connected",
        message : "connected successfully"
    })
})

router.post("/upload", upload.single("file"), uploadFile);
// router.post("/upload", (req,res) => {
//     console.log("working correctly");
//     res.status(200).json({
//         message: " working correctly "
//     })
// });

module.exports = router;