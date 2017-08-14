import AuthController from '../controllers/Auth';

export default (app) => {
  var controller = AuthController(app);

  app.post('/api/login', controller.login);
  app.post('/api/register', controller.register);

  return this;
};
