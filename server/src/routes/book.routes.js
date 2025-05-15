import { Router } from 'express';
import { createBook, getAllBooks } from '../controller/book.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.post('/', protectRoute, createBook);
router.get('/', protectRoute, getAllBooks);

//* Export the router
export default router;
