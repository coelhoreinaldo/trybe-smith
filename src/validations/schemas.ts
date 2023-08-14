import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required().min(3).messages({ 'string.empty': '"name" is required' }),
  price: Joi.string().required().min(3).messages({ 'string.empty': '"price" is required' }),
  orderId: Joi.number(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': '"username" and "password" are required',
});

export const orderSchema = Joi.object({
  productIds: Joi.array().min(1).items(Joi.number().messages({
    'number.base': '"productIds" must include only numbers',
  })).required()
    .messages({
      'array.min': '"productIds" must include only numbers',
    }),
  userId: Joi.number().strict().required(),
});