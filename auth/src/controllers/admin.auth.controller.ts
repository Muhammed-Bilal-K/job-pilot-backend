import { Request, Response, NextFunction } from "express";
import IAdminAuthUsecase from "../interfaces/usecase/admin.auth.usecase";
import ErrorHandler from "../frameworks/middleware/ErrorHandler";

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
      res.status(200).json({
        success: true,
        message: "Account logined successfully",
        token: admin.token,
        admin: admin.admin,
      });
      
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500)); 
    }
  }

  public async createSubscription(req: Request, res: Response, next: NextFunction){

    const admin = await this.adminAuthUsecase.createSubcriptionPlan(req.body);

    res.json({
      message:"good",
    })
  }

  public async getPlanDetails(req: Request, res: Response, next: NextFunction){
    const admin = await this.adminAuthUsecase.getPlanDetails();

    res.json({
      message:"good",
      planDetail: admin
    })
  }
}

export default AdminAuthcontroller;
