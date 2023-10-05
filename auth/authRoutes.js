import { Router } from 'express';
import * as authController from './authController.js';

export const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
