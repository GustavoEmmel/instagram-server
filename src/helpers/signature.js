import jwt from 'jsonwebtoken';

import {auth} from '../../config';

export const sign = (data) => {
  return jwt.sign(data, auth.LOGGED_IN_SALT);
};

export const verify = (token) => {
  return jwt.verify(token, auth.LOGGED_IN_SALT);
};
