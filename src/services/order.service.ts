import sequelize from '../database/models/index';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
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

const create = async (order:OrderBody): Promise<ServiceResponse<OrderBody>> => {
  const foundUser = await UserModel.findByPk(order.userId);
  
  if (!foundUser) { return { status: 'NOT_FOUND', data: { message: '"userId" not found' } }; }

  const { dataValues } = await sequelize.transaction(async (t) => {
    const newOrder = await OrderModel.create({ userId: order.userId }, { transaction: t });
    const productsOrder = order.productIds.map(async (productId) => {
      const updatedProducts = await ProductModel.update({
        orderId: newOrder.dataValues.id, 
      }, { where: { id: productId } });
      return updatedProducts;
    });    
    await Promise.all(productsOrder);
    return newOrder;
  });

  return { status: 'SUCCESSFUL',
    data: { userId: dataValues.userId, productIds: order.productIds } };
};

export default { getAll, create };