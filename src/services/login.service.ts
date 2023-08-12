import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import jwtFunctions from '../utils/jwtFunctions';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  const foundUser = await UserModel.findOne({ where: { username: login.username } });
  
  if (!foundUser || !bcrypt.compareSync(login.password, foundUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = foundUser.dataValues;

  const token = jwtFunctions.sign({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
}

export default { verifyLogin };