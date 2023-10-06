import { Router } from 'express';
import * as userController from './userController.js';

export const router = Router();

router.get('/user/:id', userController.getUserDetails);
router.put('/user/:id', userController.updateUser);