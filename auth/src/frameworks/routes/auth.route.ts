import express, { NextFunction, Request, Response } from "express";
import AuthController from "../../controllers/auth.controller";
import AuthRepository from "../../repositories/auth.respository";
import AuthUsecase from "../../usecase/auth.usecase";
import JwtService from "../utils/jwt";

const jwt = new JwtService();

const authRepository = new AuthRepository();
const authUsecase = new AuthUsecase(authRepository,jwt);
const authController = new AuthController(authUsecase);

const router = express.Router();


router.post("/register", (req: Request, res: Response, next: NextFunction) =>
  authController.register(req, res, next)
);

router.post(
  "/activate-user",
  (req: Request, res: Response, next: NextFunction) => {
    authController.activateUser(req, res, next);
  }
);

router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  authController.login(req, res, next)  
);

router.post("/forget-password", (req: Request, res: Response, next: NextFunction) =>
  authController.UserByEmail(req, res, next)  
);

router.post("/update-password", (req: Request, res: Response, next: NextFunction) =>
  authController.UpdatePassByEmail(req, res, next)  
  
);

export default router;