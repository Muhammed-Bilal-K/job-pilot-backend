import express, { NextFunction, Request, Response } from "express";
import AuthController from "../../controllers/auth.controller";
import AuthRepository from "../../repositories/auth.repository";
import AuthUsecase from "../../usecase/auth.usecase";
import JwtService from "../utils/jwt";
import QueuePublisher from "../rabbitmq/publisher";

const jwt = new JwtService();

const authRepository = new AuthRepository();
const queuePublisher = new QueuePublisher();
const authUsecase = new AuthUsecase(authRepository, jwt, queuePublisher);
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

router.post("/social-auth", (req: Request, res: Response, next: NextFunction) =>
  authController.socialAuth(req, res, next)
);

router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  authController.login(req, res, next)
);

router.post(
  "/forget-password",
  (req: Request, res: Response, next: NextFunction) =>
    authController.userByEmail(req, res, next)
);

router.post(
  "/update-password",
  (req: Request, res: Response, next: NextFunction) =>
    authController.updatePassByEmail(req, res, next)
);

router.post("/resend-otp", (req: Request, res: Response, next: NextFunction) =>
  authController.resendUserOtp(req, res, next)
);

router.get(
  "/current-user-data",
  (req: Request, res: Response, next: NextFunction) =>
    authController.currentUserData(req, res, next)
);

router.get(
  "/list-all-user",
  (req: Request, res: Response, next: NextFunction) =>
    authController.listUserData(req, res, next)
);

router.put("/user/:id", (req: Request, res: Response, next: NextFunction) =>
  authController.accessControllUser(req, res, next)
);

router.get(
  "/list-all-employer",
  (req: Request, res: Response, next: NextFunction) =>
    authController.listEmployerData(req, res, next)
);

router.put("/employer/:id", (req: Request, res: Response, next: NextFunction) =>
  authController.accessControllEmployer(req, res, next)
);

export default router;
