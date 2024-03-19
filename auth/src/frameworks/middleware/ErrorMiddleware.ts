import { Request, Response, NextFunction } from 'express';
import ErrorHandler from "./ErrorHandler";

export const ErrorMiddleware = (err:any, req:Request, res : Response , next : NextFunction) : void => {
    if (err instanceof ErrorHandler) {
        res.status(err.statusCode || 500).json({
            status: 'error',
            message: err.message
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};