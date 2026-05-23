import express from "express";
import { RateLimitHandler } from "../middlewares/middleware.js";

// example server
const server = express();
const port = 3434;
const hostname = 'localhost';
const url = `http://${hostname}:${port}/`;

server.use(RateLimitHandler);
server.get("/", (req, res, next) => {
    res.write("200 | OK")
    res.end("End of the Response.");
});

// listening a server
server.listen(port, hostname, (err) => {
    if (err) {
        console.log("Something went wrong !!");
        process.exit(1);
    }
    console.log("Server Up!");
    console.log(`URL : ${url}`);
});