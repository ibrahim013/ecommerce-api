// import { Router } from 'express';
import cors from 'cors';
import pkg from 'express';
const { Router } = pkg;
import CartController from '../controllers/CartController.js';

const router = Router();

router.route('/')
    .get(CartController.getCart)
    .post(CartController.createCart)
    ;
router.route('/:id')
    .get(CartController.getCartById)
    .put(CartController.updateCart)
    .delete(CartController.deleteCart)
    ;

export default router;