import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import userRouter from "../routes/user.route";
import { ErrorMiddleware } from '@validation-pilot/common';
dotenv.config();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// List of allowed origins
const allowedOrigins: string[] = [
  "http://localhost:5173",
  "https://job-pilot-frontend.vercel.app",
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET, HEAD, POST, OPTIONS, PATCH, PUT, DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// const corsOptions = {
//   origin: "http://localhost:5173",
//   // origin: "https://job-pilot-frontend.vercel.app",
//   methods: "GET, HEAD, POST, OPTIONS, PATCH, PUT , DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v4/user', userRouter);

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found`) as any;
  error.statusCode = 404;
  next(error);
});

// error middleware
app.use(ErrorMiddleware);
