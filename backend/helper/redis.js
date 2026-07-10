const Redis = require("ioredis");

const client = new Redis({
    host: 'icicle-base-vein-95026.db.redis.io',
    port: 12389,
    username: 'default',
    password: 'TRoF6DM6LYFWQ2uHQtioU6E0znDVvuW8',
});


client.on("connection" , () => console.log("Reddis is connected"));
client.on("ready", ()=> console.log("redis is ready"));
client.on('error', err => console.log('Redis Client Error', err));
client.on("close", () => console.log("Redis is closed") );

module.exports = client