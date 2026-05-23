# API-rate-limiter-throttler

#### DEMO VIDEO 📎

<video src="./sliding-window-api-limmiter.mp4" controls></video>

<!-- This will actually NOT work if typed as raw HTML, but GitHub's parser often converts a direct link to the file into a video player automatically. -->

In this rate limiter i have used the "Sliding Window" algorithm to implement this complete middleware.

Best resources to learn API Rate Limiting

- [Ref 1](https://medium.com/@bijit211987/everything-you-need-to-know-about-rate-limiting-for-apis-f236d2adcfff)

- [Ref 2](https://bytebytego.com/courses/system-design-interview/design-a-rate-limiter)

### Personal thought process on this topic-

While learning first time I am confused that why this limitters and how, where its use case.

I learned when a client send to many request to a specific server, Server takes action for their safety and to prevent millicious activity on their server such as DOS attack.

For this action server implements API Rate Limitter.

### Engineering Part (fav🤩)

Let me know how it works-

While build a software there were a lot of methods, algorithms, logic tricks, shortcuts, third party modules and much more to solve a particular problem.

In case of building **API Rate Limitter** we have some common and most used algorithms. Such as- _Sliding Window_, _Bucket Token_, _Leaking bucket_, _Fixed window counter_ etc.

While building this project I have used the _Sliding Window_ algorithm.

**Logic of Sliding Window Algorithm**

- when client send req to the server, server save his ip and its timestamp when the request intercept. (using `new Date.now()`);
  Example Object where User IP saves-

```javascript
[
'192.168.1.2': {
    timeStamps: [1777234234, 1771231231, 1772323555,...],
    // no of request == length of the timestamp, So using the length we can find the request count by user.
},
...
]
```

- filter the if the timestamps older than 1000ms

- if length of timestamps is smaller then 5 then next() function called

OR

- its directly end the response with _429 Response Code_ with message _To Many Requests_

- final step check if the ip has no timestamps that means no intrect with server, So it deletes the ip to prevent _Memory Leak_.

#### Missing part

Have to implment for more user friendly.

-[theniteshdev](http://x.com/theniteshdev)
