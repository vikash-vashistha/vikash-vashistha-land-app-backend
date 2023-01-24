const Redis = require("ioredis");

const redis = new Redis({
  port: 10897, // Redis port
  host: "redis-10897.c305.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "3wyjyA2adyiarB5KllHWq3c3XjIukiDq",
  db: 0, // Defaults to 0
});

module.exports = function rateLimiter({ secondWindow, allowedHits }) {
  return async function (req, res, next) {
    const ip = (
      req.headers["x-forwarded-for"] || req.connection.remoteAddress
    ).slice(0, 9);

    const requests = await redis.incr(ip);

    let ttl;
    if (requests === 1) {
      await redis.expire(ip, secondWindow);
      ttl = secondWindow;
    } else {
      ttl = await redis.ttl(ip);
    }

    if (requests > allowedHits) {
      return res.status(503).json({
        response: "error",
        callsInMinute: requests,
        ttl,
      });
    } else {
      req.requests = requests;
      req.ttl = ttl;
      next();
    }
  };
};
