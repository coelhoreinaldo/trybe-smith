import ProductModel, {
  ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const validateParams = ({ name, orderId, price }: ProductInputtableTypes): string | null => {
  if (!name) return 'name is required';
  if (!orderId && orderId !== 0) return 'orderId is required';
  if (!price) return 'price is required';
  return null;
};

const create = async (product: ProductInputtableTypes):Promise<ServiceResponse<Product>> => {
  let responseService: ServiceResponse<Product>;
  const error = validateParams(product);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
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