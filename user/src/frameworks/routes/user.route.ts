import express, { NextFunction, Request, Response } from "express";
import UserController from "../../controllers/user.controller";
import UserRepository from "../../repositories/usercandidate.repository";
import UserUsecase from "../../usecase/usercandidate.usecase";


const userRepository = new UserRepository();
const userUsecase =  new UserUsecase(userRepository);
const userController = new UserController(userUsecase);

const router = express.Router();

router.post(
    "/profile", 
    (req: Request, res: Response, next: NextFunction) =>
    userController.profile(req,res,next)
  );

  router.get(
    "/specific-profile/:id", 
    (req: Request, res: Response, next: NextFunction) =>
      userController.specificUser(req,res,next)
  );

export default router;