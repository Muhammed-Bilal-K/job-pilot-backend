import express, { NextFunction, Request, Response } from "express";
import JobController from "../../controllers/job.controller";
import JobRepository from "../../repositories/job.repository";
import JobUsecase from "../../usecase/job.usecase";


const jobRepository = new JobRepository();
const jobUsecase =  new JobUsecase(jobRepository);
const jobController = new JobController(jobUsecase);

const router = express.Router();

router.post(
    "/job-create", 
    (req: Request, res: Response, next: NextFunction) =>
    jobController.jobCreate(req,res,next)
  );

export default router;