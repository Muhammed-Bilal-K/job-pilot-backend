import { Request, Response, NextFunction } from "express";
import IJobUsecase from "../interfaces/usecase/job.usecase";

class JobController {
    private jobUsecase: IJobUsecase
    constructor(jobUsecase: IJobUsecase,
      ) {
      this.jobUsecase = jobUsecase;
    }
  
  
    public async jobCreate(req: Request, res: Response, next: NextFunction){
      try {
          const job = await this.jobUsecase.jobCreate(req.body);
  
          res.status(200).json({
            success: true,
            message: "job created done.",
          });
      } catch (error : any) {
        //   return next(new ErrorHandler(error.message, error.statusCode || 500));
      }
    }
}

export default JobController;