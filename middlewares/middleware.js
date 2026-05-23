// main api rate limiter middleware
const ipMapping = {};

// this is custom API rate limitter using Slide Window Algorithm
export const RateLimitHandler = (req, res, next) => {
    const date = new Date;
    if (ipMapping[req?.ip]) {
        ipMapping[req?.ip] = [...ipMapping[req?.ip], date.getTime()]
    } else {
        ipMapping[req?.ip] = [date.getTime()]
    }

    ipMapping[req?.ip] = ipMapping[req?.ip].filter(timestamp =>
        (date.getTime() - timestamp) < 1000);
    // here its handle 5reqs/1000ms

    if (ipMapping[req?.ip]?.length <= 5) {
        next();
    } else if (ipMapping[req?.ip].length > 5) {
        res.end("429 | To Many Request from you IP.");
    };

    if (ipMapping[req?.ip].length === 0) {
        delete ipMapping[req?.ip];
    }; // delete the old ips who don't send request for long time
    console.log(ipMapping);
    res.end();
};
