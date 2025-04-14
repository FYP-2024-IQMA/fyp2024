import * as accountsSocialAndTechHabitsController from "../controllers/accountsSocialAndTechHabitsController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post("/createaccountsocialandtechhabits", verifyToken, accountsSocialAndTechHabitsController.createAccountSocialAndTechHabits);

/* READ */
router.get("/getaccountsocialandtechhabitsbyid/:id", verifyToken, accountsSocialAndTechHabitsController.getAccountSocialAndTechHabitsById);

/* UPDATE */
router.patch("/updateaccountsocialandtechhabits", verifyToken, accountsSocialAndTechHabitsController.updateAccountSocialAndTechHabits);

/* DELETE */
router.delete("/deleteaccountsocialandtechhabits/:id", verifyToken, accountsSocialAndTechHabitsController.deleteAccountSocialAndTechHabits);

export default router;