import { Router } from 'express';
import CartController from '../controllers/CartController.js';

const router = Router();

router.route('/').post(CartController.createCart).get(CartController.getAllCarts);
router.route('/:id').put(CartController.updateCarts).delete(CartController.deleteCarts);

export default router;
