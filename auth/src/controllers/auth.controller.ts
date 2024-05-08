import { Request, Response, NextFunction } from "express";
import IAuthUsecase from "../interfaces/usecase/auth.usecase";
import { ErrorHandler } from "@validation-pilot/common";
import { StatusCode } from "../enums/auth";

interface CustomError extends Error {
  statusCode?: number;
}

class AuthController {
  private authUsecase: IAuthUsecase;
  constructor(authUsecase: IAuthUsecase) {
    this.authUsecase = authUsecase;
  }


  public async register(req: Request, res: Response, next: NextFunction){
    try {
        const token = await this.authUsecase.register(req.body);

        res.status(StatusCode.SUCCESS).json({
          success: true,
          activationToken: token,
          message: "Otp successfully sent to your email address.",
        });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.authUsecase.activateUser(req.body);

      res.status(201).json({
        success: true,
        message: "Account activated successfully",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
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
      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "signed successfully",
        token: user.token,
        user: user.user,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
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
      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "Account logined successfully",
        token: user.token,
        user: user.user,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async userByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.authUsecase.userByEmail(req.body);
      
      console.log(user, 'from UserByEmail');
      

      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "Email Found Successfully!",
        email: user.email,
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async updatePassByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.authUsecase.updatePassByEmail(req.body);
      
      res.status(StatusCode.SUCCESS).json({
        success: true,
        message: "Password Updated Successfully!"
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async resendUserOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.authUsecase.resendUserOtp(req.body);
      
      res.status(StatusCode.SUCCESS).json({
        success: true,
        activationToken: token,
        message: "Resend Otp successfully sent to your email address.",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async currentUserData(req: Request, res: Response, next: NextFunction) {
    try {

      const token = req.headers.authorization;

      const user = await this.authUsecase.currentUserData(token);
      
      res.status(StatusCode.SUCCESS).json({
        success: true,
        currentUser: user,
        message: "Current User Data fetch successfully",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async listUserData(req: Request, res: Response, next: NextFunction) {
    try {

      const user = await this.authUsecase.listUsers();
      
      res.status(StatusCode.SUCCESS).json({
        success: true,
        Users: user,
        message: "Listed User Data fetch successfully",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async accessControllUser(req: Request, res: Response, next: NextFunction) {
    try {

      const { id } = req.params;

      const user = await this.authUsecase.blockUser(id);
      
      res.status(StatusCode.SUCCESS).json({
        success: true,
        Users: user,
        message: "Listed User Data fetch successfully",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async listEmployerData(req: Request, res: Response, next: NextFunction) {
    try {

      const user = await this.authUsecase.listEmployers();
      
      res.status(StatusCode.SUCCESS).json({
        success: true,
        Users: user,
        message: "Listed User Data fetch successfully",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }

  public async accessControllEmployer(req: Request, res: Response, next: NextFunction) {
    try {

      const { id } = req.params;

      const user = await this.authUsecase.blockEmployer(id);
      
      res.status(StatusCode.SUCCESS).json({
        success: true,
        Users: user,
        message: "Listed User Data fetch successfully",
      });
    } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
  }
}

export default AuthController;
