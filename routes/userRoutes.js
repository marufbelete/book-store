import express from 'express';
const router = express.Router();
import {login,logout,register} from '../controllers/userController.js';

router.post('/login', login);
router.post('/logout', logout);
router.post('/register',register);


export default router;
