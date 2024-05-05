import { Request, Response, NextFunction } from "express";
import IUserUsecase from "../interfaces/usecase/usercandidate.usecase";
import { ErrorHandler } from "@validation-pilot/common";

interface CustomError extends Error {
  statusCode?: number;
}

class UserController {
    private userUsecase: IUserUsecase
    constructor(userUsecase: IUserUsecase,
      ) {
      this.userUsecase = userUsecase;
    }
  
  
    public async profile(req: Request, res: Response, next: NextFunction){
      try {
          const token = await this.userUsecase.profile(req.body);
  
          res.status(200).json({
            success: true,
            activationToken: token,
            message: "profile updated successfully.",
          });
      } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
    }

    public async specificUser(req: Request, res: Response, next: NextFunction){
      try {
        const { id } = req.params;
  
        const user = await this.userUsecase.specificUser(id);
  
        res.status(200).json({
          success: true,
          message: "user details.",
          user: user,
        });
      } catch (error: unknown) {
      if (error) {
        const err = error as CustomError;
        return next(new ErrorHandler(err.message, err.statusCode || 500));
      }
    }
    }
    
}

export default UserController;