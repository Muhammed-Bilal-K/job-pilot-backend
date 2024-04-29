import { Request, Response, NextFunction } from "express";
import IEmployerUsecase from "../interfaces/usecase/employer.usecase";
import IStripeUsecase from "../interfaces/usecase/stripe.usecase";
import { ErrorHandler } from "@validation-pilot/common";

class EmployerController {
  private employerUsecase: IEmployerUsecase;
  private stripeUsecase: IStripeUsecase;
  constructor(
    employerUsecase: IEmployerUsecase,
    stripeUsecase: IStripeUsecase
  ) {
    this.employerUsecase = employerUsecase;
    this.stripeUsecase = stripeUsecase;
  }

  public async save(req: Request, res: Response, next: NextFunction) {
    try {
      const employer = await this.employerUsecase.saveData(req.body);

      res.status(200).json({
        success: true,
        message: "Company Data saved successfully.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async updateEmploInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employer = await this.employerUsecase.updateEmploInfoData(req.body);

      res.status(200).json({
        success: true,
        message: "Company Data saved successfully.",
        companyInfo: employer,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async allAuthInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const employer = await this.employerUsecase.allAuthInfo();

      res.status(200).json({
        success: true,
        message: "Company Data saved successfully.",
        AuthInfo: employer,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async allEmployerInfo(req: Request, res: Response, next: NextFunction) {
    try {

      const {
        selectedIndustries,
        currentPage,
      } = req.query;

      const employer = await this.employerUsecase.allEmployerInfo(selectedIndustries,currentPage);

      res.status(200).json({
        success: true,
        message: "Company Data listed successfully.",
        AllEmployers: employer.company,
        current : employer.totalPages
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async subscription(req: Request, res: Response, next: NextFunction) {
    try {
      const plans = await this.stripeUsecase.createPlans(req.body);
      res.status(200).json({
        message: "done",
        url: plans,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async getCompanyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const emplo = await this.employerUsecase.getCompanyInfo(id);
      res.status(200).json({
        message: "done",
        Company: emplo,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }
}

export default EmployerController;
