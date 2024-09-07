import * as accountsAffectiveController from "../controllers/accountsAffectiveController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post(
	"/createaccountaffective",
	verifyToken,
	accountsAffectiveController.createAccountAffective
);

/* READ */
router.get(
	"/getaccountaffectivebyid/:id",
	verifyToken,
	accountsAffectiveController.getAccountAffectiveById
);

/* UPDATE */
router.patch(
	"/updateaccountaffective",
	verifyToken,
	accountsAffectiveController.updateAccountAffective
);

/* DELETE */
router.delete(
	"/deleteaccountaffective/:id",
	verifyToken,
	accountsAffectiveController.deleteAccountAffective
);

export default router;
