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
    userController.Profile(req,res,next)
  );


export default router;