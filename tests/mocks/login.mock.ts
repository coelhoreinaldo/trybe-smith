import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

const hashedPassword = bcrypt.hashSync('1234', SALT_ROUNDS)

const validLogin = {
  username: 'Hagar',
  password: '1234',
};

const loginWithoutUsername = {
  password: hashedPassword
};

const loginWithoutPassword = {
  username: 'Hagar',
};

const loginWithInvalidUsername = {
  username: 'Helga',
  password: hashedPassword,
}

const loginWithInvalidPassword = {
  username: 'Hagar',
  password: 'hahahahaha'
}

const existingUserInDb = {
    id: 1,
    username: 'Hagar',
    vocation: 'Guerreiro',
    level: 10,
    password: hashedPassword
  };

export default {
  validLogin,
  loginWithoutUsername,
  loginWithoutPassword,
  loginWithInvalidUsername,
  loginWithInvalidPassword,
  existingUserInDb,
}