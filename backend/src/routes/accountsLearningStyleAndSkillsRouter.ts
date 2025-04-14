import * as accountsLearningStyleAndSkillsController from "../controllers/accountsLearningStyleAndSkillsController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post("/createaccountlearningstyleandskills", verifyToken, accountsLearningStyleAndSkillsController.createAccountLearningStyleAndSkills);

/* READ */
router.get("/getaccountlearningstyleandskillsbyid/:id", verifyToken, accountsLearningStyleAndSkillsController.getAccountLearningStyleAndSkillsById);

/* UPDATE */
router.patch("/updateaccountlearningstyleandskills", verifyToken, accountsLearningStyleAndSkillsController.updateAccountLearningStyleAndSkills);

/* DELETE */
router.delete("/deleteaccountlearningstyleandskills/:id", verifyToken, accountsLearningStyleAndSkillsController.deleteAccountLearningStyleAndSkills);

export default router;