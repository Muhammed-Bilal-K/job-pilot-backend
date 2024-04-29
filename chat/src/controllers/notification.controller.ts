import { NextFunction, Response, Request } from "express";
import { Notificationusecase } from "../usecase/notification.usecase";

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
      res.status(200).json(del);
    } catch (err) {
      next(err);
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
      res.status(200).json(del);
    } catch (err) {
      next(err);
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
    } catch (err) {
      next(err);
    }
  }

  async geAllnotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const del = await this.notifcationusecase.getAllmessages(id);
      res.status(200).json(del);
    } catch (err) {
      next(err);
    }
  }
}
