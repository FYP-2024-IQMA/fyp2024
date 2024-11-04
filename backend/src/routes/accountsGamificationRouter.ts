import * as accountsGamificationController from "../controllers/accountsGamificationController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* READ */
router.get(
	"/gamificationdata/:userid",
	verifyToken,
	accountsGamificationController.getGamificationData
);
router.get(
	"/leaderboard/:userid",
	verifyToken,
	accountsGamificationController.getTop5Accounts
);
router.get(
	"/badges/:userid",
	verifyToken,
	accountsGamificationController.getBadges
);

router.get(
    "/getlatestbadge/:sectionid/:unitid",
    verifyToken,
    accountsGamificationController.getLatestBadge
);

/* UPDATE */
router.patch(
	"/updatepoints",
	verifyToken,
	accountsGamificationController.updatePoints
);

router.patch(
	"/updateloginstreaks/:userid",
	verifyToken,
	accountsGamificationController.updateStreaksFromLogin
);

router.patch(
	"/updateunitstreaks/:userid/:quizid",
	verifyToken,
	accountsGamificationController.updateStreaksFromUnit
);
export default router;
