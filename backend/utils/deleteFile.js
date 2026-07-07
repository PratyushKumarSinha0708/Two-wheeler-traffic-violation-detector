const fs = require("fs");

function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if(err) {
            console.log("Unable to delete file.");
        }
    });
}

module.exports = deleteFile;