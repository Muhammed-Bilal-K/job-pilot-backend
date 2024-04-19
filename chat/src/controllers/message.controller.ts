import { Request, Response, NextFunction } from "express";
import IMessageUsecase from "../interfaces/usecase/message.usecase";
import { ErrorHandler } from "@validation-pilot/common";

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
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async getConvo(req: Request, res: Response, next: NextFunction) {
    try {
      const convo = await this.messageUsecase.getConvo(req.params.id);
      res.status(200).json({
        convo: convo,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }
}

export default MessageController;
