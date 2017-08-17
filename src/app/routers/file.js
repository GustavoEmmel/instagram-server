import findAction from '../controllers/file/find';
import createAction from '../controllers/file/create';
import findOneAction from '../controllers/file/findOne';
import deleteAction from '../controllers/file/delete';

import uploadMiddleware from '../middlewares/upload';

export default (app) => {
  app.get('/api/file', findAction);
  app.post('/api/file', uploadMiddleware, createAction);
  app.get('/api/file/:id', findOneAction);
  app.delete('/api/file/:id', deleteAction);
};
