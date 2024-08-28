import { Router } from 'express';
import * as accountsCognitiveController from '../controllers/accountsCognitiveController';

const router = Router();

/* CREATE */
router.post("/createaccountcognitive", accountsCognitiveController.createAccountCognitive);

/* READ */
router.get('/getaccountcognitivebyid/:id', accountsCognitiveController.getAccountCognitiveById);

/* UPDATE */
router.patch('/updateaccountcognitive', accountsCognitiveController.updateAccountCognitive);

/* DELETE */
router.delete('/deleteaccountcognitive/:id', accountsCognitiveController.deleteAccountCognitive);

export default router;