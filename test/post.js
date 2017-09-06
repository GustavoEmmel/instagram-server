import chai, {expect} from 'chai';

import {sign} from '../src/helpers/signature';
import Post from '../src/app/models/Post';
import User from '../src/app/models/User';
import File from '../src/app/models/File';

export default (server) => {

  describe('Post', () => {

    var body = {
      message: 'minha imagem bonitinha',
    };

    var authorization = null;
    
    before(() => {
      return User.findOne({}).then((user) => {
        const {name, email} = user;
        authorization = 'JWT ' + sign({name, email});
      });
    });
    
    before(() => {
      return File.findOne({}).then((file) => {
        body.image = file._id;
      });
  	});
    
  	describe('GET /api/post', () => {
  		it('it should get posts', (done) => {
  			chai.request(server)
          .get('/api/post')
          .set('Authorization', authorization)
  				.end((err, res) => {
  					expect(err, 'No error').to.be.null;
  					res.should.have.status(200);
  					res.body.should.be.a('array');
  					done();
  				});
  		});
  	});

    describe('POST /api/post', () => {
      it('it should create a post', (done) => {
        chai.request(server)
          .post('/api/post')
          .set('Authorization', authorization)
          .send(body)
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.user.should.be.a('string');
            res.body.message.should.be.a('string');
            body._id = res.body._id;
            done();
          });
      });
    });

    describe('GET /api/post/:id', () => {
  		it('it should get one post', (done) => {
  			chai.request(server)
          .get('/api/post/' + body._id)
          .set('Authorization', authorization)
  				.end((err, res) => {
  					expect(err, 'No error').to.be.null;
  					res.should.have.status(200);
  					res.body.should.be.a('object');
            res.body.user.should.be.a('string');
            res.body.message.should.be.a('string');
  					done();
  				});
  		});
  	});

    describe('PUT /api/post/:id', () => {
      it('it should update a put', (done) => {
        chai.request(server)
          .put('/api/post/' + body._id)
          .set('Authorization', authorization)
          .send(body)
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(200);
            res.body.user.should.be.a('string');
            res.body.message.should.be.a('string');
            done();
          });
      });
    });

    describe('DELETE /api/post/:id', () => {
      it('it should delete a post', (done) => {
        chai.request(server)
          .delete('/api/post/' + body._id)
          .set('Authorization', authorization)
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(204);
            done();
          });
      });
    });

  });

};
