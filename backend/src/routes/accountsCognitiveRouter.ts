import * as accountsCognitiveController from "../controllers/accountsCognitiveController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post(
	"/createaccountcognitive",
	verifyToken,
	accountsCognitiveController.createAccountCognitive
);

/* READ */
router.get(
	"/getaccountcognitivebyid/:id",
	verifyToken,
	accountsCognitiveController.getAccountCognitiveById
);

/* UPDATE */
router.patch(
	"/updateaccountcognitive",
	verifyToken,
	accountsCognitiveController.updateAccountCognitive
);

/* DELETE */
router.delete(
	"/deleteaccountcognitive/:id",
	verifyToken,
	accountsCognitiveController.deleteAccountCognitive
);

export default router;
