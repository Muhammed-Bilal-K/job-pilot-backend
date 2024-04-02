import { Request, Response, NextFunction } from "express";
import IEmployerUsecase from "../interfaces/usecase/employer.usecase";
import IStripeUsecase from "../interfaces/usecase/stripe.usecase";

class EmployerController {
    private employerUsecase: IEmployerUsecase
    private stripeUsecase : IStripeUsecase
    constructor(employerUsecase: IEmployerUsecase,
      stripeUsecase : IStripeUsecase
      ) {
      this.employerUsecase = employerUsecase;
      this.stripeUsecase = stripeUsecase
    }
  
  
    public async Save(req: Request, res: Response, next: NextFunction){
      try {
          const employer = await this.employerUsecase.saveData(req.body);
  
          res.status(200).json({
            success: true,
            message: "Company Data saved successfully.",
          });
      } catch (error : any) {
        //   return next(new ErrorHandler(error.message, error.statusCode || 500));
      }
    }

    public async allAuthInfo(req: Request, res: Response, next: NextFunction){
      try {
          const employer = await this.employerUsecase.allAuthInfo();
  
          res.status(200).json({
            success: true,
            message: "Company Data saved successfully.",
            AuthInfo : employer
          });
      } catch (error : any) {
        //   return next(new ErrorHandler(error.message, error.statusCode || 500));
      }
    }
    
    public async Subscription(req: Request, res: Response, next: NextFunction){
      try{
        const plans=await this.stripeUsecase.createPlans(req.body)
        res.status(200).json({
          message:"done",
          url:plans
        })
       }catch(err){
        next(err)
    }
  }

}

export default EmployerController;