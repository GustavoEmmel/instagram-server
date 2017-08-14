
import app from './app';
import database from './database';
import {db, http} from '../config';

database.connect(db.URL, { useMongoClient: true }).then(() => {
  console.log(`Database connected.`);
  app.emit('database:started');
});

app.listen(http.PORT, http.HOST, () => {
  console.log(`Server listening on http://${http.HOST}:${http.PORT}`);
  app.emit('app:started');
});

process.on('uncaughtException', err => console.log('Uncaught exception', err.message));
process.on('unhandledRejection', err => console.log('Unhandled rejection', err.message));

export default app;
