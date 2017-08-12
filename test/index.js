
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src';

chai.use(chaiHttp);
chai.should();

describe('App', () => {

	describe('GET /', () => {
		it('it should GET the hello world', (done) => {
			chai.request(server)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.message.should.be.eql('Hello world');
					done();
				});
		});
	});

  describe('GET /none', () => {
		it('it should GET the 404 page', (done) => {
			chai.request(server)
				.get('/none')
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
          res.body.code.should.be.eql(404);
					res.body.message.should.be.eql('Cannot GET /none');
					done();
				});
		});
	});

});
