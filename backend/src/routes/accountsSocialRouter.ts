import { Router } from 'express';
import * as accountsSocialController from '../controllers/accountsSocialController';
import verifyToken from '../middleware/authMiddleware';
const router = Router();

/* CREATE */
router.post("/createaccountsocial", verifyToken,accountsSocialController.createAccountSocial);

/* READ */
router.get('/getaccountsocialbyid/:id',verifyToken, accountsSocialController.getAccountSocialById);

/* UPDATE */
router.patch('/updateaccountsocial', verifyToken,accountsSocialController.updateAccountSocial);

/* DELETE */
router.delete('/deleteaccountsocial/:id',verifyToken, accountsSocialController.deleteAccountSocial);

export default router;