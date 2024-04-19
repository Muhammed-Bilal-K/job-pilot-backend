import express, { NextFunction, Request, Response } from "express";
import ConversationController from "../../controllers/conversation.controller";
import ConverationRepository from "../../repositories/conversation.repository";
import ConversationUsecase from "../../usecase/conversation.usecase";
import QueuePublisher from "../rabbitmq/publisher";


const converationRepository = new ConverationRepository();
const queuePublisher = new QueuePublisher();
const conversationUsecase = new ConversationUsecase(converationRepository, queuePublisher);
const conversationController = new ConversationController(conversationUsecase);

const router = express.Router();

router.post("/create", (req: Request, res: Response, next: NextFunction) =>
  conversationController.create(req, res, next)
);

router.get("/user/:userId", (req: Request, res: Response, next: NextFunction) =>
  conversationController.find(req, res, next)
);


export default router; 
