import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return 400 when email is not provided', async function () {
    const httpResponse = await chai.request(app).post('/login').send(loginMock.loginWithoutUsername);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.have.key('message');
    expect(httpResponse.body.message).to.equal('"username" and "password" are required');
  });

  it('should return 400 when password is not provided', async function () {
    const httpResponse = await chai.request(app).post('/login').send(loginMock.loginWithoutPassword);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body.message).to.equal('"username" and "password" are required');
  });

  it('should return 401 when username is invalid', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const httpResponse = await chai.request(app).post('/login').send(loginMock.loginWithInvalidUsername);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal('Username or password invalid');
  });

  it('should return 401 when password is invalid', async function () {
    const userInstance = UserModel.build(loginMock.existingUserInDb);
    sinon.stub(UserModel, 'findOne').resolves(userInstance);

    const httpResponse = await chai.request(app).post('/login').send(loginMock.loginWithInvalidPassword);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal('Username or password invalid');
  });

  // it('should return 200 when login is successful', async function () {
  //   const userInstance = UserModel.build(loginMock.existingUserInDb);
  //   sinon.stub(UserModel, 'findOne').resolves(userInstance);

  //   const httpResponse = await 
  //   chai.request(app).post('/login').send(loginMock.validLogin);

  //   expect(httpResponse.status).to.equal(200);
  //   expect(httpResponse.body).to.have.key('token');
  // });
});
