import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { NextApiRequest, NextApiResponse } from "next";

const applyMiddleware =
  (middleware: Function) => (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) =>
        result instanceof Error ? reject(result) : resolve(result)
      );
    });

const getIP = (req: any) =>
  req.ip ||
  req.headers["x-forwarded-for"] ||
  req.headers["x-real-ip"] ||
  req.socket.remoteAddress;

export const getRateLimitMiddlewares = ({
  limit = 5,
  windowMs = 2 * 60 * 1000,
  delayAfter = Math.round(5 / 2),
  delayMs = 500,
} = {}) => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

const middlewares = getRateLimitMiddlewares();

async function applyRateLimit(req: NextApiRequest, res: NextApiResponse) {
  await Promise.all(
    middlewares.map(applyMiddleware).map((middleware) => middleware(req, res))
  );
}

export default applyRateLimit;
