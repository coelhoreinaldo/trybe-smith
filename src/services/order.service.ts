import sequelize from '../database/models/index';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { OrderBody } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';
// import { orderSchema } from '../validations/schemas';

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

// const verifyErrorType = (message:string) :string => 
//   (message.includes('must') ? 'UNPROCESSABLE_ENTITY' : 'INVALID_DATA');

const create = async (order:OrderBody): Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  // const { error } = orderSchema.validate(order);
  
  // if (error) {
  //   return { status: verifyErrorType(error.details[0].message), data: { message: error.details[0].message } };
  // }
  const foundUser = await UserModel.findByPk(order.userId);
  if (!foundUser) { return { status: 'NOT_FOUND', data: { message: '"userId" not found' } }; }

  const { dataValues } = await sequelize.transaction(async (t) => {
    const newOrder = await OrderModel.create({ userId: order.userId }, { transaction: t });
    const productsOrder = order.productIds.map(async (e) => {
      const updatedProducts = ProductModel.update({
        orderId: newOrder.dataValues.id, 
      }, { where: { id: e } });
      return updatedProducts;
    });    
    await Promise.all(productsOrder);
    return newOrder;
  });
  
  return { status: 'SUCCESSFUL',
    data: { userId: dataValues.userId, productIds: order.productIds } as any };
};

export default { getAll, create };