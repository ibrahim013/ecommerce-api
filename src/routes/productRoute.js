import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

import authValidator from '../middleware/AuthValidator.js';


const router = Router();

router.route('/').post().get();
router.route('/:id').get().delete().put();
router.route('/categories').get().post(authValidator, ProductController.createCategory)
router.route('/categories/:id').put().delete()

export default router;