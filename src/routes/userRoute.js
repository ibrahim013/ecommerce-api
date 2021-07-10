import pkg from 'express';
const { Router } = pkg;
import AuthController from '../controllers/AuthController.js';

const router = Router();

router.route('/register').post(AuthController.signUp);
router.route('/login').post(AuthController.login);

export default router;
