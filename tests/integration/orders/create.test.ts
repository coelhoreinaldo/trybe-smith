import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import orderMock from '../../mocks/order.mock';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return status 201 with the new order created', async function () {
    // const userInstance = UserModel.build(loginMock.existingUserInDb);
    // sinon.stub(UserModel, 'findOne').resolves(userInstance);
    const result = await chai.request(app).post('/login').send({
      username: 'Hagar',
      password: 'terrível',
    });
    const token = result.body.token;
  

    const userFindByPkReturn = UserModel.build(loginMock.existingUserInDb);
    sinon.stub(UserModel, 'findByPk').resolves(userFindByPkReturn);

    const createOrderReturn = OrderModel.build(orderMock.createOrder);
    sinon.stub(OrderModel, 'create').resolves(createOrderReturn);

    const updateProductsReturn = ProductModel.bulkBuild(orderMock.toUpdateProducts as any);
    
    sinon.stub(ProductModel, 'update').resolves(updateProductsReturn as any);

    const httpResponse = await chai.request(app).post('/orders').send(orderMock.validOrderBody).set('authorization', `Bearer ${token}`);
  
    expect(httpResponse.body).to.be.deep.equal(orderMock.validOrderBody);
    expect(httpResponse.status).to.equal(201);
  });

  it('should return status 404 when user is not found', async function () {
    // const userInstance = UserModel.build(loginMock.existingUserInDb);
    // sinon.stub(UserModel, 'findOne').resolves(userInstance);

    const result = await chai.request(app).post('/login').send(loginMock.validLogin);

    const token = result.body.token;
  
    sinon.stub(UserModel, 'findByPk').resolves(null);

    const httpResponse = await chai.request(app).post('/orders').send(orderMock.validOrderBody).set('authorization', `Bearer ${token}`);
  
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" not found' });
    expect(httpResponse.status).to.equal(404);
  });
});
