import { Router } from 'express';
import * as accountsSocialController from '../controllers/accountsSocialController';

const router = Router();

/* CREATE */
router.post("/createaccountsocial", accountsSocialController.createAccountSocial);

/* READ */
router.get('/getaccountsocialbyid/:id', accountsSocialController.getAccountSocialById);

/* UPDATE */
router.patch('/updateaccountsocial', accountsSocialController.updateAccountSocial);

/* DELETE */
router.delete('/deleteaccountsocial/:id', accountsSocialController.deleteAccountSocial);

export default router;