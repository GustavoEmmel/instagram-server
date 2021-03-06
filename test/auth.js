import chai, { expect } from 'chai';

import User from '../src/app/models/User';

export default (server) => {

  describe('Auth', () => {

    before(() => {
      return User.findOneAndRemove({ _id: 'test' });
    });

    describe('POST /api/register', () => {
      it('it should get register', (done) => {
        chai.request(server)
          .post('/api/register')
          .send({
            name: 'test',
            email: 'test@gmail.com',
            password: '123',
          })
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.name.should.be.a('string');
            res.body.email.should.be.a('string');
            done();
          });
      });
    });

    describe('POST /api/register', () => {
      it('it should throw, user already exists.', (done) => {
        chai.request(server)
          .post('/api/register')
          .send({
            name: 'test',
            email: 'test@gmail.com',
            password: '123',
          })
          .end((err, res) => {
            expect(err, 'Forbidden error').to.be.an('error');
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.message.should.be.eql('User already exists.');
            done();
          });
      });
    });

    describe('POST /api/register', () => {
      it('it should fail to register, password is missing', (done) => {
        chai.request(server)
          .post('/api/register')
          .send({
            notname: 'test',
            notpassword: '12345',
          })
          .end((err, res) => {
            expect(err, 'Bad request error').to.be.an('error');
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.message.should.be.eql('Bad request.');
            done();
          });
      });
    });

    describe('POST /api/login', () => {
      it('it should get login', (done) => {
        chai.request(server)
          .post('/api/login')
          .send({
            name: 'test',
            password: '123',
          })
          .end((err, res) => {
            expect(err, 'No error').to.be.null;
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.token.should.be.a('string');
            res.body.user.should.be.a('object');
            done();
          });
      });
    });

    describe('POST /api/login', () => {
      it('it should fail to login, user not found', (done) => {
        chai.request(server)
          .post('/api/login')
          .send({
            name: 'god',
            password: '12345',
          })
          .end((err, res) => {
            expect(err, 'Unauthorized error').to.be.an('error');
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.message.should.be.eql('Authentication failed: user not found.');
            done();
          });
      });
    });

    describe('POST /api/login', () => {
      it('it should fail to login, wrong password', (done) => {
        chai.request(server)
          .post('/api/login')
          .send({
            name: 'test',
            password: '12345',
          })
          .end((err, res) => {
            expect(err, 'Unauthorized error').to.be.an('error');
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.message.should.be.eql('Authentication failed: wrong password.');
            done();
          });
      });
    });

  });

};
