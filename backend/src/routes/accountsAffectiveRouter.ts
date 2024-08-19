import { Router } from 'express';
import * as accountsAffectiveController from '../controllers/accountsAffectiveController';

const router = Router();

/* CREATE */
router.post("/createaccountaffective", accountsAffectiveController.createAccountAffective);

/* READ */
router.get('/getaccountaffectivebyid/:id', accountsAffectiveController.getAccountById);

/* UPDATE */
router.patch('/updateaccountaffective', accountsAffectiveController.updateAccountAffective);

/* DELETE */
router.delete('/deleteaccountaffective/:id', accountsAffectiveController.deleteAccountAffective);

export default router;