import Repository from '../../db/Repository';
import File from '../../models/File';

export default (req, res) => {
  if (req.file) {
    var repository = new Repository(File);
    repository
      .create(req.file)
      .then((file) => {
        res.status(201).json(file);
      });
  } else {
    res.status(400).json({
      code: 400,
      message: 'Bad request, file not send',
    });
  }
};
