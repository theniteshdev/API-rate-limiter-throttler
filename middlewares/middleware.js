// main api rate limiter middleware
const ipMapping = {};

const WINDOW_MS = 5000;
const MAX_REQS = 5;

// this is custom API rate limitter using Slide Window Algorithm
export const RateLimitHandler = (req, res, next) => {
    const clientIp = req.ip || req.headers['x-forwarded-for'];
    const now = Date.now();

    //Logical Nullish Operator instead of if statement
    ipMapping[clientIp] ??= [];

    //Filtering out the timestamps older WINDOW_MS 
    ipMapping[clientIp] = ipMapping[clientIp].filter(
        (timestamp) => (now - timestamp) < WINDOW_MS //5000
    )
    
    //Logging the timestamp
    ipMapping[clientIp].push(now);
    
    //Checking limit boundaries
    if (ipMapping[clientIp].length > MAX_REQS) {
        // Set proper HTTP status header
        res.status(429).json({
            status: 429,
            error: "Too Many Requests",
            message: "Too many requests from your IP. Please try again later."
        });
        return; // Stop execution here
    }

    next();
};

setInterval(() => {
    const current = Date.now();
    for(let ip in ipMapping){
        //Filtering out the timestamps older WINDOW_MS 
        ipMapping[ip] = ipMapping[ip].filter(
            (timestamp) => (current - timestamp) < WINDOW_MS //5000
        )
        //Deleting if it's old
        if(ipMapping[ip].length === 0){
            delete ipMapping[ip];
        }
    }
}, 5000)
