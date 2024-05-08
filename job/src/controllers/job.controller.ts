import { Request, Response, NextFunction } from "express";
import IJobUsecase from "../interfaces/usecase/job.usecase";
import { ErrorHandler } from "@validation-pilot/common";
import { StatusCode } from "../enums/job";

interface CustomError extends Error {
  statusCode?: number;
}

class JobController {
  private jobUsecase: IJobUsecase;
  constructor(jobUsecase: IJobUsecase) {
    this.jobUsecase = jobUsecase;
  }

  public async jobCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const job = await this.jobUsecase.jobCreate(req.body);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job created successfully.",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async jobList(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        selectedIndustries,
        selectedSalaryRange,
        selectedJobType,
        selectedSort,
        currentPage,
      } = req.query;

      console.log(req.query);
      

      const job = await this.jobUsecase.jobList(
        selectedIndustries,
        selectedSalaryRange,
        selectedJobType,
        selectedSort,
        currentPage
      );

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job listed successfull.",
        jobs: job.jobs,
        current: job.totalPages,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async allJobApplicant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const job = await this.jobUsecase.allJobApplicant();

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async applicant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const job = await this.jobUsecase.applicant(id);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async authUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const job = await this.jobUsecase.authUserById(id);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async makeFavoriteJob(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { JobId } = req.body;

      const job = await this.jobUsecase.makeFavoriteJob(id, JobId);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job added favorite.",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async getPreferredJobs(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { preferedJobList } = req.query;

      const jobs = await this.jobUsecase.getPreferredJobs(preferedJobList);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job added favorite.",
        preferrefJob: jobs,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async companyJobByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const job = await this.jobUsecase.jobListByUser(id);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async jobAppliedUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { jobId } = req.params;

      const job = await this.jobUsecase.jobAppliedUserDetail(id, jobId);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async userShortListed(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { jobId } = req.params;

      const job = await this.jobUsecase.userShortListByValid(id, jobId);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "User Shortlisted successfull.",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async comapnyJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const job = await this.jobUsecase.comapnyJobs(email);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job listed successfull.",
        jobs: job,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async jobApply(req: Request, res: Response, next: NextFunction) {
    try {
      const job = await this.jobUsecase.jobApply(req.body);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "job applied successfull.",
        job: job,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async companyDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await this.jobUsecase.companyDetail();

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "company details fetched successfull.",
        comInfo: company,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }
}

export default JobController;
