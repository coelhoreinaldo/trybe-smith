import { Router } from 'express';
import orderController from '../controllers/order.controller';
import authMiddleware from '../middlewares/auth';

const orderRouter = Router();

orderRouter.get('/orders', orderController.getAll);
orderRouter.post('/orders', authMiddleware, orderController.create);

export default orderRouter;