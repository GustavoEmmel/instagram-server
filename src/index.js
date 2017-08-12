
import app from './app';
import {http} from '../config';

app.listen(http.port, http.host, () => {
  console.log(`Server listening on http://${http.host}:${http.port}`);
});

process.on('uncaughtException', err => console.log('Uncaught exception', err));
process.on('unhandledRejection', err => console.log('Unhandled rejection', err));
