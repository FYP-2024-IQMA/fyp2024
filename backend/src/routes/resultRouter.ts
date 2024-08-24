import * as resultController from '../controllers/resultController';
import { Router } from 'express';

const router = Router();

/* CREATE */
router.post("/createresult", resultController.createResult);

/* READ */
router.get('/getallresults', resultController.getAllResults);
router.get("/getresultbyid/:userid", resultController.getResultByUserId);
router.get("/getuserprogress/:userid/:sectionid?", resultController.getUserProgress);
router.get("/getcircularprogress/:userid/:sectionid/:unitid", resultController.getCircularProgress);

export default router;