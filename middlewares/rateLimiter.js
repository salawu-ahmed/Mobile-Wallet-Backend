import ratelimiter from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // userId, ip
        const { success } = await ratelimiter.limit('my-rate-llimit')
        if (!success) {
            res.status(429).json({ message: 'Too many request, please try again later' })
        }

        next()

    } catch (error) {
        console.log('Rate limit error', error);
        next(error)
    }
}

export default rateLimiter