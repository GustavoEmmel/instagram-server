import Repository from '../../db/Repository';
import File from '../../models/File';

export default (req, res) => {
  var repository = new Repository(File);
  repository
    .findOne({ _id: req.params.id })
    .then((file) => {
      res.json(file);
    });
};
