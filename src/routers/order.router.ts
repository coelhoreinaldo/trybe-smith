import { Router } from 'express';
import orderController from '../controllers/order.controller';
import authMiddleware from '../middlewares/auth';
import validateOrder from '../middlewares/validateOrder';

const orderRouter = Router();

orderRouter.get('/orders', orderController.getAll);
orderRouter.post('/orders', authMiddleware, validateOrder, orderController.create);

export default orderRouter;