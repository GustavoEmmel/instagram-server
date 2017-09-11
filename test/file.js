import chai, { expect } from 'chai';

import { sign } from '../src/helpers/signature';
import File from '../src/app/models/File';
import User from '../src/app/models/User';

export default (server) => {

  describe('File', () => {

    var body = {
      originalname: 'chaves.jpg',
    };

    var authorization = null;

    before(() => {
      return User.findOne({}).then((user) => {
        const { name, email } = user;
        authorization = 'JWT ' + sign({ name, email });
      });
    });

    before(() => {
      return File.remove({ originalname: body.originalname });
    });

    describe('GET /api/file', () => {
      it('it should get files', (done) => {
        chai.request(server)
          .get('/api/file')
          .set('Authorization', authorization)
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
      });
    });

    describe('POST /api/file', () => {
      it('it should create a file', (done) => {
        chai.request(server)
          .post('/api/file')
          .set('Authorization', authorization)
          .attach('file', './uploads/' + body.originalname)
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.filename.should.be.a('string');
            res.body.mimetype.should.be.a('string');
            body._id = res.body._id;
            done();
          });
      });
    });

    describe('GET /api/file/:id', () => {
      it('it should get a file', (done) => {
        chai.request(server)
          .get('/api/file/' + body._id)
          .set('Authorization', authorization)
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.filename.should.be.a('string');
            res.body.mimetype.should.be.a('string');
            done();
          });
      });
    });

    describe('DELETE /api/file/:id', () => {
      it('it should delete a file', (done) => {
        chai.request(server)
          .delete('/api/file/' + body._id)
          .set('Authorization', authorization)
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(204);
            done();
          });
      });
    });

    describe('DELETE /api/file/:id', () => {
      it('it should throw not found', (done) => {
        chai.request(server)
          .delete('/api/file/5995fd02cf447a4d1c21e1ba')
          .set('Authorization', authorization)
          .end((err, res) => {
            expect(err, 'Not found error').to.be.an('error');
            res.should.have.status(404);
            done();
          });
      });
    });
  });
};
