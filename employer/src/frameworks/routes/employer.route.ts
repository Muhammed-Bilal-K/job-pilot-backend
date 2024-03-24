import express, { NextFunction, Request, Response } from "express";
import EmployerController from "../../controllers/employer.controller";
import EmployerRepository from "../../repositories/employer.repository";
import EmployerUsecase from "../../usecase/employer.usecase";
import StripeUsecase from "../../usecase/stripe.usecase";
import StripeRepository from "../../repositories/stripe.repository";


const employerRepository = new EmployerRepository();
const employerUsecase =  new EmployerUsecase(employerRepository);
const stripeRepository = new StripeRepository();
const stripeUsecase = new StripeUsecase(stripeRepository);
const employerController = new EmployerController(employerUsecase, stripeUsecase);

const router = express.Router();

router.post(
    "/job-create", 
    (req: Request, res: Response, next: NextFunction) =>
    employerController.jobCreate(req,res,next)
  );

router.post(
    "/plans", 
    (req: Request, res: Response, next: NextFunction) =>
    employerController.Subscription(req,res,next)
  );


export default router;