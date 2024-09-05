import * as accountsController from '../controllers/accountsController';

import { Router } from 'express';

import verifyToken from '../middleware/authMiddleware';

const router = Router();

/* CREATE */
router.post("/createaccount", verifyToken,accountsController.createAccount);

/* READ */
router.get('/getallaccounts', verifyToken,accountsController.getAllAccounts);
router.get('/getaccountbyid/:id', verifyToken,accountsController.getAccountById);
router.get("/getaccountsbyrole/:role", verifyToken,accountsController.getAccountsByRole);
router.post('/setToken', accountsController.getJwtToken);
router.post('/logout', verifyToken,accountsController.logout);

/* UPDATE */
router.patch('/updateaccount',verifyToken, accountsController.updateAccount);

/* DELETE */
router.delete('/deleteaccount/:id', verifyToken,accountsController.deleteAccount);

export default router;