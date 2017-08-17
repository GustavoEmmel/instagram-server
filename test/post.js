import chai, {expect} from 'chai';

import Post from '../src/app/models/Post';

export default (server) => {

  describe('Post', () => {

    var body = {
      user: 'matheuslbarros',
      message: 'minha imagem bonitinha',
    };

    /*
  	before(() => {
  		return Post.findOneAndRemove({message: body.message});
  	});
    */
   
  	describe('GET /api/post', () => {
  		it('it should get posts', (done) => {
  			chai.request(server)
  				.get('/api/post')
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
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(204);
            done();
          });
      });
    });

  });

};
