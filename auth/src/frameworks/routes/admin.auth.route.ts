import express, { NextFunction, Request, Response } from "express";
import AdminAuthcontroller from "../../controllers/admin.auth.controller";
import AdminAuthUsecase from "../../usecase/admin.auth.usecase";
import JwtService from "../utils/jwt";
import AdminAuthRepository from "../../repositories/admin.auth.repository";
import { adminverify } from '@validation-pilot/common'

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
  adminverify,
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.createSubscription(req, res, next);
  }
);

router.delete(
  "/delete-subscription/:id",
  adminverify,
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.deleteSubscription(req, res, next);
  }
);

router.delete(
  "/delete-specific-user/:id",
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.deleteUser(req, res, next);
  }
);

router.put(
  "/subscription/plans/:id",
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.editSubscription(req, res, next);
  }
);

router.put(
  "/employer-verify-success/:id",
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.DoneVerify(req, res, next);
  }
);

router.put(
  "/employer-verify-denied/:id",
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.DeniedVerify(req, res, next);
  }
);

router.get(
  "/get-plan-details",
  (req: Request, res: Response, next: NextFunction) => {
    adminAuthController.getPlanDetails(req, res, next);
  }
);

export default router;
