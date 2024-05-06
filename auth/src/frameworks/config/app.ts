import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "../routes/auth.route";
import adminAuthRouter from "../routes/admin.auth.route";
import { ErrorMiddleware } from '@validation-pilot/common';
dotenv.config();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());


const corsOptions = {
  origin: "https://job-pilot-frontend.vercel.app",
  methods: "GET, HEAD, POST, OPTIONS, PATCH, PUT , DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v6/admin/auth', adminAuthRouter);

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found`) as any;
  error.statusCode = 404;
  next(error);
});

// error middleware
app.use(ErrorMiddleware);
