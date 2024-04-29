import express, { NextFunction, Request, Response } from "express";
import { Notificationcontoller } from "../../controllers/notification.controller";
import { Notificationusecase } from "../../usecase/notification.usecase";
import NotificationRepository from "../../repositories/notification.repository";

const repository = new NotificationRepository();
const usecase = new Notificationusecase(repository);
const controller = new Notificationcontoller(usecase);

const router = express.Router();

router.post("/create-message",(req, res, next)=>{
  controller.createNotifications(req, res, next)
})

router.post("/delete-messages", (req, res, next) =>
  controller.deleteAllNotifications(req, res, next)
);
router.get("/get-messages/:id", (req, res, next) =>
  controller.geAllnotification(req, res, next)
);
router.post("/delete-messagesbyindex", (req, res, next) =>
  controller.removeNotificationAtIndex(req, res, next)
);

export default router;
