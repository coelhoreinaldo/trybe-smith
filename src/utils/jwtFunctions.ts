import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number;
  username: string;
};

const sign = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
};

const verify = (token: string): TokenPayload => {
  const payload = jwt.verify(token, secret) as TokenPayload;
  return payload;
};

export default { sign, verify };
