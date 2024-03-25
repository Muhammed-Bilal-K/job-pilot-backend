import { Request, Response, NextFunction } from "express";
import IUserUsecase from "../interfaces/usecase/usercandidate.usecase";

class UserController {
    private userUsecase: IUserUsecase
    constructor(userUsecase: IUserUsecase,
      ) {
      this.userUsecase = userUsecase;
    }
  
  
    public async Profile(req: Request, res: Response, next: NextFunction){
      try {
          const token = await this.userUsecase.Profile(req.body);
  
          res.status(200).json({
            success: true,
            activationToken: token,
            message: "profile updated successfully.",
          });
      } catch (error : any) {
        //   return next(new ErrorHandler(error.message, error.statusCode || 500));
      }
    }
    
}

export default UserController;