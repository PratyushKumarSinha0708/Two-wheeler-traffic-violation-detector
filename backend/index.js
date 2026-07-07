require("dotenv").config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;

const uploadRoutes = require("./routes/uploadRoutes")

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api" , uploadRoutes)

app.use("/uploads" , express.static(path.join(__dirname, "uploads")));






app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});