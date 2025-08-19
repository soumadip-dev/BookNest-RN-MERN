import { Router } from 'express';
import { createBook } from '../controller/book.controller.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.post('/', createBook);

//* Export the router
export default router;
