import * as userStoneProgressController from "../controllers/userStoneProgressController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post("/createuserstoneprogress", verifyToken, userStoneProgressController.createUserStoneProgress);

/* READ */
router.get("/getallusersstoneprogress", verifyToken, userStoneProgressController.getAllUserStoneProgress);
router.get(
	"/getuserstoneprogress/:id",
	verifyToken,
	userStoneProgressController.getUserStoneProgressByUserId
);

/* UPDATE */
router.patch("/updateuserstoneprogress", verifyToken, userStoneProgressController.updateUserStoneProgress);

/* DELETE */
router.delete(
	"/deleteuserstoneprogress/:id",
	verifyToken,
	userStoneProgressController.deleteUserStoneProgress
);

export default router;