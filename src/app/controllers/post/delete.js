import Repository from '../../db/Repository';
import Post from '../../models/Post';

export default (req, res) => {
  var repository = new Repository(Post);
  repository
    .delete({ _id: req.params.id })
    .then((post) => {
      res.status(204).end();
    });
};
