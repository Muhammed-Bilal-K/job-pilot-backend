import express, { NextFunction, Request, Response } from "express";
import JobController from "../../controllers/job.controller";
import JobRepository from "../../repositories/job.repository";
import JobUsecase from "../../usecase/job.usecase";


const jobRepository = new JobRepository();
const jobUsecase =  new JobUsecase(jobRepository);
const jobController = new JobController(jobUsecase);

const router = express.Router();

router.get(
    "/company-detail", 
    (req: Request, res: Response, next: NextFunction) =>
    jobController.companyDetail(req,res,next)
  );

router.post(
    "/job-create", 
    (req: Request, res: Response, next: NextFunction) =>
    jobController.jobCreate(req,res,next)
  );

router.get(
    "/job-list", 
    (req: Request, res: Response, next: NextFunction) =>
    jobController.jobList(req,res,next)
  );

router.get(
    "/all-job-applicant", 
    (req: Request, res: Response, next: NextFunction) =>
    jobController.allJobApplicant(req,res,next)
  );

router.get(
    "/applicant/:id", 
    (req: Request, res: Response, next: NextFunction) =>
    jobController.Applicant(req,res,next)
  );

router.get(
    "/list-jobs-company/:email", 
    (req: Request, res: Response, next: NextFunction) =>
    jobController.ComapnyJobs(req,res,next)
  );

router.post('/apply',(req: Request, res: Response, next: NextFunction) =>{
  jobController.jobApply(req,res,next)
})


export default router;