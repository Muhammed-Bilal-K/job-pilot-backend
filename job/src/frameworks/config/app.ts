import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import jobRouter from "../routes/job.route";
// import { ErrorMiddleware } from '../middleware/ErrorMiddleware';
dotenv.config();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, OPTIONS, PATCH, PUT",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v3/job', jobRouter);

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found`) as any;
  error.statusCode = 404;
  next(error);
});

// error middleware
// app.use(ErrorMiddleware);
