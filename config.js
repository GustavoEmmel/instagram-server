
exports.http = {
  HOST: process.env.HTTP_HOST || 'localhost',
  PORT: process.env.HTTP_PORT || 8080,
};

exports.db = {
  URL: 'mongodb://127.0.0.1:27017/instagram',
};

exports.auth = {
  LOGGED_IN_SALT: '#.3Z>N=tVc0;@h>MUL*@eJe]Voo3->L+MI7mF&f<<nJl^=|d`Y=xnm<foT%$J*{[',
};
