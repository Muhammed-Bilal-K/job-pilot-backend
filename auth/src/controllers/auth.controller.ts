import { Request, Response, NextFunction } from "express";
import IAuthUsecase from "../interfaces/usecase/auth.usecase";

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
    } catch (error) {
      console.log(error,'from auth.controller1');
        
      //   return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

  public async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body, 'from active');
      await this.authUsecase.activateUser(req.body);

      res.status(201).json({
        success: true,
        message: "Account activated successfully",
      });
    } catch (error: any) {
      // return next(new ErrorHandler(error.message, error.statusCode || 500));
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
        token: user.token,
        user: user.user,
      });
    } catch (error: any) {
        console.log(error,'from auth.controller');
        
    //   return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }

}

export default AuthController;
