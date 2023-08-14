import { NextFunction, Request, Response } from 'express';
import { orderSchema } from '../validations/schemas';

const verifyErrorType = (message:string) :number => 
  (message.includes('must') ? 422 : 400);

const validateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = orderSchema.validate(req.body);

  if (error) {
    return res.status(verifyErrorType(error.details[0].message))
      .json({ message: error.details[0].message });
  }
  next();
};

export default validateOrder;