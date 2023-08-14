import { Request, Response } from 'express';
import orderService from '../services/order.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const getAll = async (req: Request, res: Response) => {
  const allOrders = await orderService.getAll();

  return res.status(200).json(allOrders.data);
};

const create = async (req: Request, res: Response) => {
  const { productIds, userId } = req.body;
  const newOrder = await orderService.create({ productIds, userId });

  if (newOrder.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(newOrder.status)).send(newOrder.data);
  }

  return res.status(201).json(newOrder.data);
};

export default { getAll, create };