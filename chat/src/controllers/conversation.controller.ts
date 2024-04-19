import { Request, Response, NextFunction } from "express";
import IConversationUsecase from "../interfaces/usecase/conversation.usecase";
import { ErrorHandler } from "@validation-pilot/common";

class ConversationController {
  private conversationUsecase: IConversationUsecase;
  constructor(conversationUsecase: IConversationUsecase) {
    this.conversationUsecase = conversationUsecase;
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      
      const convo = await this.conversationUsecase.create(
        req.body.recieverId,
        req.body.senderId
      );
      console.log(convo , 'from data');
      
      res.status(200).json({
        convo : convo
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async find(req: Request, res: Response, next: NextFunction) {
    try {
      const convo = await this.conversationUsecase.find(
        req.params.userId
      );      
      res.status(200).json({
        convo : convo
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }
}

export default ConversationController;
