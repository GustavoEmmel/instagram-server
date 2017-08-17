import Repository from '../../db/Repository';
import Post from '../../models/Post';

export default (req, res) => {
  var repository = new Repository(Post);
  repository
    .findOne({ _id: req.params.id })
    .then((post) => {
      res.json(post);
    });
};
