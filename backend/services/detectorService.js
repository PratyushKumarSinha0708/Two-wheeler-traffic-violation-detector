const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function detectViolation(filePath) {
    const form = new FormData();

    form.append(
        "file", 
        fs.createReadStream(filePath)
    );

    const response = await axios.post(
        `${process.env.FASTAPI_URL}/detect`, 
        form,
        {
            headers:form.getHeaders(),
            maxBodyLength: Infinity,
            maxContentLength: Infinity
        }
    );

    return response.data;
}

module.exports = { detectViolation };