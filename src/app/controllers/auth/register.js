import bcrypt from 'bcryptjs';

import User from '../../models/User';

export default async (req, res) => {
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
