import fs from 'fs';
import Repository from '../../db/Repository';
import File from '../../models/File';

export default (req, res) => {
  var repository = new Repository(File);
  repository
    .findOne({ _id: req.params.id })
    .then((file) => {
      if (file) {
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
      } else {
        res.status(404).send({
          code: 404,
          message: 'Not found',
        });
      }
  });

  /*
  if (file) {

  } else {
    res.status(404).send({
      code: 404,
      message: 'Not found',
    })
  }
  */
};
