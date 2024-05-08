import { Request, Response, NextFunction } from "express";
import IAdminAuthUsecase from "../interfaces/usecase/admin.auth.usecase";
import { ErrorHandler } from '@validation-pilot/common';
import { StatusCode } from "../enums/auth";

interface CustomError extends Error {
  statusCode?: number;
}

class AdminAuthcontroller {
  private adminAuthUsecase: IAdminAuthUsecase;
  constructor(adminAuthUsecase: IAdminAuthUsecase) {
    this.adminAuthUsecase = adminAuthUsecase;
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.adminAuthUsecase.login(req.body);

      res.cookie("token", admin.token, {
        expires: admin.expires,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "Account logined successfully",
        token: admin.token,
        admin: admin.admin,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async editSubscription(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const planData = req.body;

      const admin = await this.adminAuthUsecase.editSubscription(id, planData);

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "Plan updated successfully",
        plan: admin,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async createSubscription(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const admin = await this.adminAuthUsecase.createSubcriptionPlan(req.body);

      res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Plan created successfully!",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async doneVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const admin = await this.adminAuthUsecase.doneVerify(id);

      res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Plan created successfully!",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async deniedVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const admin = await this.adminAuthUsecase.deniedVerify(id);

      res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Plan created successfully!",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async deleteSubscription(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const admin = await this.adminAuthUsecase.deleteSubcriptionPlan(id);

      res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "Plan deleted successfully!",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const admin = await this.adminAuthUsecase.deleteUser(id);

      res.status(StatusCode.SUCCESS).json({
        status: true,
        message: "User deleted successfully!",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async getPlanDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await this.adminAuthUsecase.getPlanDetails();

      res.status(StatusCode.SUCCESS).json({
        message: "Listed all plans succesfully!",
        planDetail: admin,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }
}

export default AdminAuthcontroller;
