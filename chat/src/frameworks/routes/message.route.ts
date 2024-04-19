import express, { NextFunction, Request, Response } from "express";
import MessageController from "../../controllers/message.controller";
import MessageRepository from "../../repositories/message.respository";
import MessageUsecase from "../../usecase/message.usecase";
import QueuePublisher from "../rabbitmq/publisher";


const messageRepository = new MessageRepository();
const queuePublisher = new QueuePublisher();
const messageUsecase = new MessageUsecase(messageRepository, queuePublisher);
const messageController = new MessageController(messageUsecase);

const router = express.Router();

router.post("/create", (req: Request, res: Response, next: NextFunction) =>
  messageController.create(req, res, next)
);

router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
  messageController.getConvo(req, res, next)
);

export default router; 