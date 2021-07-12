import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';
import { deletCategoryById } from '../controllers/deleteCategoryController.js';

import authValidator from '../middleware/AuthValidator.js';


const router = Router();

router.route('/').post(authValidator, ProductController.createProduct).get(ProductController.getProduct);
router.route('/s/:productId').get(ProductController.getProductById).delete().put();
router.route('/categories').get(ProductController.getCategory).post(authValidator, ProductController.createCategory)
router.route('/categories/:id').put().delete(deletCategoryById)

export default router;