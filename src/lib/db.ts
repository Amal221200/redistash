import { Redis } from '@upstash/redis';

declare global {
    var redis: Redis | undefined;
}

const db = globalThis.redis || new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})

if (process.env.NODE_ENV !== 'production') globalThis.redis = db

export default db