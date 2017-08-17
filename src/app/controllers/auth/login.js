import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import {auth} from '../../../../config';
import User from '../../models/User';

export default async (req, res) => {
  var {name, password} = req.body;
  var user = await User.findOne({ _id: name });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      var {name, email} = user;
      var token = jwt.sign({name, email}, auth.LOGGED_IN_SALT);
      res.json({token, user});
    } else {
      res.status(401).json({message: 'Authentication failed: wrong password.'});
    }
  } else {
    res.status(401).json({message: 'Authentication failed: user not found.'});
  }
};
