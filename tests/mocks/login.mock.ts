const hashedPassword = '$10$2DaI./DdKB85Yk5JRJJShOlBoSPRySzqrV4qP/zkQ5POw5HLzNAKi'

const validLogin = {
  username: 'Hagar',
  password: 'terrível',
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

const validToken = 'validToken'

export default {
  validLogin,
  loginWithoutUsername,
  loginWithoutPassword,
  loginWithInvalidUsername,
  loginWithInvalidPassword,
  existingUserInDb,
  validToken,
}