import {verify} from '../../helpers/signature';

export default (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ');

    if (authorization[0] === "JWT") {
      req.user = verify(authorization[1]);
    }
  }
  next();
};
