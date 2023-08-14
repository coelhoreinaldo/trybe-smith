import sequelize from '../database/models/index';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { OrderBody } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

const getAll = async (): Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const allOrders = await OrderModel.findAll({
    attributes: [
      'id', 
      'userId',
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    include: [{
      model: ProductModel,
      attributes: [],
      as: 'productIds',
    }],
    group: ['Order.id'],
    raw: true,
  });

  return { status: 'SUCCESSFUL', data: allOrders };
};

const create = async ({
  productIds, userId }:OrderBody): Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  if (!productIds || !userId) { return { status: 'INVALID_DATA', data: { message: 'deu ruim' } }; }

  const result = await sequelize.transaction(async (t) => {
    const newOrder = await OrderModel.create({ userId }, { transaction: t });
    const productsOrder = productIds.map(async (e) => {
      const updatedProducts = ProductModel.update({
        orderId: newOrder.dataValues.id, 
      }, { where: { id: e } });

      return updatedProducts;
    });    
    await Promise.all(productsOrder);
    return newOrder;
  });

  console.log(result);

  return { status: 'SUCCESSFUL', data: result as any };
};

export default { getAll, create };