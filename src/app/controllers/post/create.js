import Repository from '../../db/Repository';
import Post from '../../models/Post';
import Unauthorized from '../../exceptions/Unauthorized';

export default (req, res) => {
  if (!req.user) {
    throw new Unauthorized('User not authenticated');
  }

  req.body.user = req.user.name;
  
  var repository = new Repository(Post);
  repository
    .create(req.body)
    .then((post) => {
      res.status(201).json(post);
    });
};
