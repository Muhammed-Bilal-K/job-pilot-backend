import { Request, Response, NextFunction } from "express";
import IAuthUsecase from "../interfaces/usecase/auth.usecase";
import ErrorHandler from "../frameworks/middleware/ErrorHandler";

class AuthController {
  private authUsecase: IAuthUsecase;
  constructor(authUsecase: IAuthUsecase) {
    this.authUsecase = authUsecase;
  }


  public async register(req: Request, res: Response, next: NextFunction){
    try {
        const token = await this.authUsecase.register(req.body);

        res.status(200).json({
          success: true,
          activationToken: token,
          message: "Otp successfully sent to your email address.",
        });
    } catch (error : any) {
        return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.authUsecase.activateUser(req.body);

      res.status(201).json({
        success: true,
        message: "Account activated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }


  public async socialAuth(req: Request, res: Response, next: NextFunction) {
    try {
      
      const user = await this.authUsecase.socialAuth(req.body);

      res.cookie("token", user.token, {
        expires: user.expires,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({
        success: true,
        message: "signed successfully",
        token: user.token,
        user: user.user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }


  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.authUsecase.login(req.body);

      res.cookie("token", user.token, {
        expires: user.expires,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({
        success: true,
        message: "Account logined successfully",
        token: user.token,
        user: user.user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async UserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.authUsecase.UserByEmail(req.body);
      
      console.log(user, 'from UserByEmail');
      

      res.status(200).json({
        success: true,
        message: "Email Found Successfully!",
        email: user.email,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async UpdatePassByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.authUsecase.UpdatePassByEmail(req.body);
      
      res.status(200).json({
        success: true,
        message: "Password Updated Successfully!"
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async ResendUserOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.authUsecase.ResendUserOtp(req.body);
      
      res.status(200).json({
        success: true,
        activationToken: token,
        message: "Resend Otp successfully sent to your email address.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async CurrentUserData(req: Request, res: Response, next: NextFunction) {
    try {

      const token = req.headers.authorization;

      const user = await this.authUsecase.CurrentUserData(token);
      
      res.status(200).json({
        success: true,
        currentUser: user,
        message: "Current User Data fetch successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async ListUserData(req: Request, res: Response, next: NextFunction) {
    try {

      const user = await this.authUsecase.ListUsers();
      
      res.status(200).json({
        success: true,
        Users: user,
        message: "Listed User Data fetch successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }
}

export default AuthController;
