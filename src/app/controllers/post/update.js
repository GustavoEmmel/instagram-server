import Repository from '../../db/Repository';
import Post from '../../models/Post';

export default (req, res) => {
  var repository = new Repository(Post);
  repository
    .update({ _id: req.params.id }, req.body)
    .then((post) => {
      res.json(post);
    });
};
