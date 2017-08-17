import Repository from '../../db/Repository';
import Post from '../../models/Post';

export default (req, res) => {
  var repository = new Repository(Post);
  repository
    .create(req.body)
    .then((post) => {
      res.status(201).json(post);
    });
};
