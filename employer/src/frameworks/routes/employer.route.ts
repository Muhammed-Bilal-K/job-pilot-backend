import express, { NextFunction, Request, Response } from "express";
import EmployerController from "../../controllers/employer.controller";
import EmployerRepository from "../../repositories/employer.repository";
import EmployerUsecase from "../../usecase/employer.usecase";
import StripeUsecase from "../../usecase/stripe.usecase";
import StripeRepository from "../../repositories/stripe.repository";
import QueuePublisher from "../rabbitmq/publisher";

const employerRepository = new EmployerRepository();
const stripeRepository = new StripeRepository();
const queuePublisher = new QueuePublisher();
const employerUsecase = new EmployerUsecase(employerRepository, queuePublisher);
const stripeUsecase = new StripeUsecase(stripeRepository);
const employerController = new EmployerController(
  employerUsecase,
  stripeUsecase
);

const router = express.Router();

router.post("/save-data", (req: Request, res: Response, next: NextFunction) =>
  employerController.save(req, res, next)
);

router.put("/update-found-info", (req: Request, res: Response, next: NextFunction) =>
  employerController.updateEmploInfo(req, res, next)
);

router.get(
  "/list-all-auth",
  (req: Request, res: Response, next: NextFunction) =>
    employerController.allAuthInfo(req, res, next)
);

router.get(
  "/list-all-employers",
  (req: Request, res: Response, next: NextFunction) =>
    employerController.allEmployerInfo(req, res, next)
);

router.get(
  "/list-specific-company/:id",
  (req: Request, res: Response, next: NextFunction) =>
    employerController.getCompanyInfo(req, res, next)
);

router.post("/plans", (req: Request, res: Response, next: NextFunction) =>
  employerController.subscription(req, res, next)
);

export default router;
