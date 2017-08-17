import Repository from '../../db/Repository';
import File from '../../models/File';

export default (req, res) => {
  var repository = new Repository(File);
  repository
    .find({})
    .then((files) => {
      res.json(files);
    });
};
