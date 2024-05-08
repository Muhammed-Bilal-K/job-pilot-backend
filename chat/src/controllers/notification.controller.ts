import { NextFunction, Response, Request } from "express";
import { Notificationusecase } from "../usecase/notification.usecase";
import { ErrorHandler } from "@validation-pilot/common";
import { StatusCode } from "../enums/chat";

interface CustomError extends Error {
  statusCode?: number;
}


export class Notificationcontoller {
  private notifcationusecase: Notificationusecase;
  constructor(notifcationusecase: Notificationusecase) {
    this.notifcationusecase = notifcationusecase;
  }

  async createNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const del = await this.notifcationusecase.createNotifications(
        req.body
      );
      res.status(StatusCode.SUCCESS).json(del);
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  

  }
  async deleteAllNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const del = await this.notifcationusecase.deleteAllNotifications(
        req.body.id
      );
      res.status(StatusCode.SUCCESS).json(del);
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  async removeNotificationAtIndex(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const del = await this.notifcationusecase.removeNotificationAtIndex(
        req.body.id
      );
      res.status(del.status).json(del.data);
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  async geAllnotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const del = await this.notifcationusecase.getAllmessages(id);
      res.status(StatusCode.SUCCESS).json(del);
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }
}
