import Repository from '../../db/Repository';
import File from '../../models/File';
import Unauthorized from '../../exceptions/Unauthorized';

export default (req, res) => {
  if (req.file) {
    if (!req.user) {
      throw new Unauthorized('User not authenticated');
    }

    req.file.user = req.user.name;

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
