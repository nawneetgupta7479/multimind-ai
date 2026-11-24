import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;

const redisOptions = {
  maxRetriesPerRequest: null, // Prevents MaxRetriesPerRequestError
  enableReadyCheck: false,
  retryStrategy: (times) => {
    return Math.min(times * 200, 2000);
  },
};

// Enable TLS automatically if using rediss:// or upstash
if (redisUrl && (redisUrl.startsWith("rediss://") || redisUrl.includes("upstash.io"))) {
  redisOptions.tls = {
    rejectUnauthorized: false,
  };
}

const redis = new Redis(redisUrl, redisOptions);

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});

export default redis;
