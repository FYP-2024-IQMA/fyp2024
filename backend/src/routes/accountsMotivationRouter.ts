import * as accountsMotivationController from "../controllers/accountsMotivationController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post("/createaccountmotivation", verifyToken, accountsMotivationController.createAccountMotivation);

/* READ */
router.get("/getaccountmotivationbyid/:id", verifyToken, accountsMotivationController.getAccountMotivationById);

/* UPDATE */
router.patch("/updateaccountmotivation", verifyToken, accountsMotivationController.updateAccountMotivation);

/* DELETE */
router.delete("/deleteaccountmotivation/:id", verifyToken, accountsMotivationController.deleteAccountMotivation);

export default router;