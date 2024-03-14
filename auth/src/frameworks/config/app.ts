import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "../routes/auth.route";
dotenv.config();
// import { ErrorMiddleware } from "@s7abab/common";
// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// app.use(cors({
//   origin: 'https://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

// morgan for logging in console
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1/auth', authRouter);

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found`) as any;
  error.statusCode = 404;
  next(error);
});

// error middleware
// app.use(ErrorMiddleware);
