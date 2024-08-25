import * as accountsController from '../controllers/accountsController';

import { Router } from 'express';

const router = Router();

/* CREATE */
router.post('/createaccount', accountsController.createAccount);

/* READ */
router.get('/getallaccounts', accountsController.getAllAccounts);
router.get('/getaccountbyid/:id', accountsController.getAccountById);
router.get('/getaccountsbyrole/:role', accountsController.getAccountsByRole);

/* UPDATE */
router.patch('/updateaccount', accountsController.updateAccount);

/* DELETE */
router.delete('/deleteaccount/:id', accountsController.deleteAccount);


export default router;