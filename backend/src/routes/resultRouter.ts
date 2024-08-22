import * as resultController from '../controllers/resultController';

import { Router } from 'express';

const router = Router();

/* CREATE */
router.post("/createresult", resultController.createResult);

/* READ */
router.get('/getallresults', resultController.getAllResults);
router.get('/getresultbyid/:id', resultController.getResultByUserId);

/* UPDATE */
router.patch('/updateresult', resultController.updateResult);

/* DELETE */
// router.delete('/deleteresult/:id', resultController.deleteresult);

export default router;