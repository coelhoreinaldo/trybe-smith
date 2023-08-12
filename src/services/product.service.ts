import Joi from 'joi';
import ProductModel, {
  ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const productSchema = Joi.object({
  name: Joi.string().required().min(3).messages({ 'string.empty': '"name" is required' }),
  price: Joi.string().required().min(3).messages({ 'string.empty': '"price" is required' }),
  orderId: Joi.number(),
});

const validateParams = ({ name, price }: ProductInputtableTypes): string | null => {
  if (!name) return '"name" is required';
  if (!price) return '"price" is required';
  return null;
};

const create = async (product: ProductInputtableTypes):Promise<ServiceResponse<Product>> => {
  let responseService: ServiceResponse<Product>;
  const isInvalidFields = validateParams(product);
  if (isInvalidFields) {
    responseService = { status: 'INVALID_DATA', data: { message: isInvalidFields } };
    return responseService;
  }
    
  const { error } = productSchema.validate(product);

  if (error) {
    responseService = {
      status: 'UNPROCESSABLE_ENTITY', data: { message: error.details[0].message } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  responseService = { status: 'SUCCESSFUL', data: newProduct.dataValues };

  return responseService;
};

const getAll = async ():Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const allProducts = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: allProducts };
};

export default { create, getAll };