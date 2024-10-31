import express from "express";

export const web = express();

// middleware
web.use(web.json());
