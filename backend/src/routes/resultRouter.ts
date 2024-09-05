import * as resultController from '../controllers/resultController';
import { Router } from 'express';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

/* CREATE */
router.post("/createresult", verifyToken,resultController.createResult);

/* READ */
router.get('/getallresults',verifyToken, resultController.getAllResults);
router.get("/getresultbyid/:userid", verifyToken,resultController.getResultByUserId);
router.get("/getuserprogress/:userid/:sectionid?",verifyToken, resultController.getUserProgress);
router.get("/getcircularprogress/:userid/:sectionid/:unitid",verifyToken, resultController.getCircularProgress);

export default router;