import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import authMiddleware from './app/middlewares/auth';
import authRouter from './app/routers/auth';
import postRouter from './app/routers/post';
import fileRouter from './app/routers/file';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  });
});

authRouter(app);
postRouter(app);
fileRouter(app);

app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Cannot GET ' + req.url,
  });
});

app.use((err, req, res, next) => {
  console.log('Unhandled application error: ', err);
  res.status(500).send(err);
  next();
});

export default app;
