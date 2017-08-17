import Repository from '../../db/Repository';
import Post from '../../models/Post';

export default (req, res) => {
  var repository = new Repository(Post);
  repository
    .find({})
    .then((posts) => {
      res.json(posts);
    });
};
