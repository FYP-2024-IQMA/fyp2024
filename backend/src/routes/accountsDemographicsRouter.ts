import { Router } from 'express';
import * as accountsDemographicsController from '../controllers/accountsDemographicsController';

const router = Router();

/* CREATE */
router.post("/createaccountdemographics", accountsDemographicsController.createAccountDemographics);

/* READ */
router.get('/getaccountdemographicsbyid/:id', accountsDemographicsController.getAccountDemographicsById);

/* UPDATE */
router.patch('/updateaccountdemographics', accountsDemographicsController.updateAccountDemographics);

/* DELETE */
router.delete('/deleteaccountdemographics/:id', accountsDemographicsController.deleteAccountDemographics);

export default router;