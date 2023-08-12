import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import orderMock from '../../mocks/order.mock';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('should return 200 and a list of orders', async function () {
    sinon.stub(OrderModel, 'findAll').resolves(orderMock.allOrders as any);
    const response = await chai.request(app).get('/orders');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(orderMock.allOrders);
  }
  );

});
