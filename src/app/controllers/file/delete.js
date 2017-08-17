import fs from 'fs';
import Repository from '../../db/Repository';
import File from '../../models/File';

export default (req, res) => {
  var repository = new Repository(File);
  repository
    .findOneOrFail({ _id: req.params.id })
    .then(file => {
      repository
        .delete({ _id: req.params.id })
        .then(() => {
          fs.unlink(file.destination + file.filename, (err) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(204).end();
            }
          });
        });
  })
  .catch(err => {
    res.status(err.code).send({
      code: err.code,
      message: err.message,
    });
  });
};
