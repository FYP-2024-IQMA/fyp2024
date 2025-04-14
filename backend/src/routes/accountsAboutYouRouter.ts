import * as accountsAboutYouController from "../controllers/accountsAboutYouController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post("/createaccountaboutyou", verifyToken, accountsAboutYouController.createAccountAboutYou);

/* READ */
router.get("/getaccountaboutyoubyid/:id", verifyToken, accountsAboutYouController.getAccountAboutYouById);

/* UPDATE */
router.patch("/updateaccountaboutyou", verifyToken, accountsAboutYouController.updateAccountAboutYou);

/* DELETE */
router.delete("/deleteaccountaboutyou/:id", verifyToken, accountsAboutYouController.deleteAccountAboutYou);

export default router;