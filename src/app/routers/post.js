import findAction from '../controllers/post/find';
import createAction from '../controllers/post/create';
import findOneAction from '../controllers/post/findOne';
import updateAction from '../controllers/post/update';
import deleteAction from '../controllers/post/delete';

export default (app) => {
  app.get('/api/post', findAction);
  app.post('/api/post', createAction);
  app.get('/api/post/:id', findOneAction);
  app.put('/api/post/:id', updateAction);
  app.delete('/api/post/:id', deleteAction);
};
