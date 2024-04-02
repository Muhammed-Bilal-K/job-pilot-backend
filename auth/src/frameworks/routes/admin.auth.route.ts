import express, { NextFunction, Request, Response } from "express";
import AdminAuthcontroller from "../../controllers/admin.auth.controller";
import AdminAuthUsecase from "../../usecase/admin.auth.usecase";
import JwtService from "../utils/jwt";
import AdminAuthRepository from "../../repositories/admin.auth.repository";

const jwt = new JwtService();

const adminAuthRepository = new AdminAuthRepository();
const adminAuthUsecase = new AdminAuthUsecase(adminAuthRepository, jwt);
const adminAuthController = new AdminAuthcontroller(adminAuthUsecase);

const router = express.Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  adminAuthController.login(req, res, next);
});

router.post(
  "/create-subscription",
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.createSubscription(req, res, next);
  }
);

router.put(
  "/subscription/plans/:id",
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.editSubscription(req, res, next);
  }
);

router.get(
  "/get-plan-details",
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.getPlanDetails(req, res, next);
  }
);

export default router;
