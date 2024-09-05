import { Router } from 'express';
import * as accountsDemographicsController from '../controllers/accountsDemographicsController';
import verifyToken from '../middleware/authMiddleware';
const router = Router();

/* CREATE */
router.post("/createaccountdemographics", verifyToken,accountsDemographicsController.createAccountDemographics);

/* READ */
router.get('/getaccountdemographicsbyid/:id', verifyToken,accountsDemographicsController.getAccountDemographicsById);

/* UPDATE */
router.patch('/updateaccountdemographics', verifyToken,accountsDemographicsController.updateAccountDemographics);

/* DELETE */
router.delete('/deleteaccountdemographics/:id', verifyToken,accountsDemographicsController.deleteAccountDemographics);

export default router;