import {login, register} from '../controllers/Auth';

export default (app) => {
  app.post('/api/login', login);
  app.post('/api/register', register);
};
