import { Request, Response, NextFunction } from "express";
import IMessageUsecase from "../interfaces/usecase/message.usecase";
import { ErrorHandler } from "@validation-pilot/common";

interface CustomError extends Error {
  statusCode?: number;
}

class MessageController {
  private messageUsecase: IMessageUsecase;
  constructor(messageUsecase: IMessageUsecase) {
    this.messageUsecase = messageUsecase;
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await this.messageUsecase.create(req.body);
      res.status(200).json({
        message: message,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async getConvo(req: Request, res: Response, next: NextFunction) {
    try {
      const convo = await this.messageUsecase.getConvo(req.params.id);
      res.status(200).json({
        convo: convo,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }
}

export default MessageController;
