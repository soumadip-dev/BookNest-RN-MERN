import { Router } from 'express';
import { registerUser, loginUser } from '../controller/auth.controller.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.post('/register', registerUser);
router.post('/login', loginUser);

//* Export the router
export default router;
