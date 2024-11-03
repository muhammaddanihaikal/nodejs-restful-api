import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

// middleware
web.use(web.json());
web.use(publicRouter);
