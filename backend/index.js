require("dotenv").config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const ip = require('ip');
const redis = require("./helper/redis");


const MAX_ALLOWED_REQ = 5;
const MAX_TIME = 15cd ;

const app = express();

let ip_mapping = {};

setInterval(() => {
    ip_mapping = {};
}, MAX_TIME);

const PORT = process.env.PORT || 3000;

const uploadRoutes = require("./routes/uploadRoutes")

app.use(cors());

app.use(async (req,res,next) => {
    const my_ip = req.ip;

    // ip_mapping[my_ip] = ip_mapping[my_ip] + 1 || 1;

    // if (ip_mapping[my_ip] > MAX_ALLOWED_REQ) {
    //     res.status(429).send("Too many requests");
    // }

    // console.log(`no of ip requests = ${ip_mapping[my_ip]} for ip address = ${my_ip}`);

    const request = await redis.incr(my_ip);

    if (request === 1) {
        redis.expire(my_ip, MAX_TIME);
    }

    if (request > MAX_ALLOWED_REQ) {
        return res.status(429).send("Too many requests");
    }

    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api" , uploadRoutes)

app.use("/uploads" , express.static(path.join(__dirname, "uploads")));






app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});