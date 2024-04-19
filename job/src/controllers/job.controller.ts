import { Request, Response, NextFunction } from "express";
import IJobUsecase from "../interfaces/usecase/job.usecase";
import { ErrorHandler } from "@validation-pilot/common";

class JobController {
  private jobUsecase: IJobUsecase;
  constructor(jobUsecase: IJobUsecase) {
    this.jobUsecase = jobUsecase;
  }

  public async jobCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const job = await this.jobUsecase.jobCreate(req.body);

      res.status(200).json({
        success: true,
        message: "job created successfully.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async jobList(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query, "from job list");
      const {
        selectedIndustries,
        selectedSalaryRange,
        selectedJobType,
        selectedSort,
        currentPage,
      } = req.query;

      const job = await this.jobUsecase.jobList(
        selectedIndustries,
        selectedSalaryRange,
        selectedJobType,
        selectedSort,
        currentPage
      );

      // console.log(job, 'from');

      res.status(200).json({
        success: true,
        message: "job listed successfull.",
        jobs: job.jobs,
        current: job.totalPages,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async allJobApplicant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const job = await this.jobUsecase.allJobApplicant();

      res.status(200).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async Applicant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const job = await this.jobUsecase.Applicant(id);

      res.status(200).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async AuthUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const job = await this.jobUsecase.AuthUserById(id);

      res.status(200).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async MakeFavoriteJob(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { JobId } = req.body;

      const job = await this.jobUsecase.MakeFavoriteJob(id, JobId);

      res.status(200).json({
        success: true,
        message: "job added favorite.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async GetPreferredJobs(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { preferedJobList } = req.query;

      console.log(preferedJobList);
      

      const jobs = await this.jobUsecase.GetPreferredJobs(preferedJobList);

      res.status(200).json({
        success: true,
        message: "job added favorite.",
        preferrefJob:jobs
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async CompanyJobByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const job = await this.jobUsecase.JobListByUser(id);

      res.status(200).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async ComapnyJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const job = await this.jobUsecase.ComapnyJobs(email);

      res.status(200).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async jobApply(req: Request, res: Response, next: NextFunction) {
    try {
      const job = await this.jobUsecase.jobApply(req.body);

      res.status(200).json({
        success: true,
        message: "job applied successfull.",
        job: job,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async companyDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await this.jobUsecase.companyDetail();

      res.status(200).json({
        success: true,
        message: "company details fetched successfull.",
        comInfo: company,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }
}

export default JobController;
