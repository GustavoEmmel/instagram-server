import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import {auth} from '../../../config';
import User from '../models/User';

export const register = async (req, res) => {
  var {name, email, password} = req.body;
  var user = await User.findOne({ _id: name });
  if (user) {
    res.status(403).json({message: 'User already exists.'});
  } else {
    var newUser = new User({_id: name, email, password});

    try {
      await newUser.validate();
    } catch(error) {
      res.status(400).json({message: 'Bad request.', error});
      return;
    }

    newUser.password = bcrypt.hashSync(password, 10);
    var createdUser = await newUser.save();
    res.status(201).json(createdUser);
  }
};

export const login = async (req, res) => {
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
