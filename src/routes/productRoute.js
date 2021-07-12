import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

import authValidator from '../middleware/AuthValidator.js';


const router = Router();

router.route('/').post(authValidator, ProductController.createProduct).get(ProductController.getProduct);
router.route('/s/:productId').get(ProductController.getProductById).delete().put();
router.route('/categories').get(ProductController.getCategory).post(authValidator, ProductController.createCategory)
router.route('/categories/:id').put(authValidator, ProductController.updateCategoryById).delete(authValidator, ProductController.removeCategoryById)

export default router;