import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should send status 200 with the new product created', async function(){
    const mockCreateReturn = ProductModel.build(productMock.validProduct);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    const httpResponse = await chai
    .request(app)
    .post('/products')
    .send(productMock.validProduct)

    expect(httpResponse.status).to.equal(201)
    expect(httpResponse.body).to.be.deep.equal(mockCreateReturn.dataValues)
  })

});
