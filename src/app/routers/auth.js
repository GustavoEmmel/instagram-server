import loginAction from '../controllers/auth/login';
import registerAction from '../controllers/auth/register';

export default (app) => {
  app.post('/api/login', loginAction);
  app.post('/api/register', registerAction);
};
