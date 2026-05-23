import express from "express";
import { RateLimitHandler } from "../middlewares/middleware.js";

// testing the middleware

const server = express();
const port = 3333;
const hostname = 'localhost';
const url = `http://${hostname}:${port}/`;

server.use(RateLimitHandler);
server.get("/", (req, res, next) => {
    res.write("200 | OK\n")
    res.end("--End of the Response--");
});

// listening a server
server.listen(port, hostname, (err) => {
    if (err) {
        console.log("Testing:: Something went wrong while listening server !!");
        process.exit(1);
    }
    console.log("Testing Server Up!");
    console.log(`Test URL : ${url}`);
});

// everything is working fine