import { Request, Response } from 'express';
import productService from '../services/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const create = async (req: Request, res: Response) => {
  const { name, orderId, price } = req.body;
  const serviceResponse = await productService.create({ name, orderId, price });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  return res.status(201).json(serviceResponse.data);
};

const getAll = async (_req: Request, res: Response) => {
  const serviceResponse = await productService.getAll();
  return res.status(200).json(serviceResponse.data);
};

export default { create, getAll };