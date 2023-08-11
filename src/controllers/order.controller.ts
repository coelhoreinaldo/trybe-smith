import { Request, Response } from 'express';
import orderService from '../services/order.service';

const getAll = async (req: Request, res: Response) => {
  const allOrders = await orderService.getAll();

  return res.status(200).json(allOrders.data);
};

export default { getAll };