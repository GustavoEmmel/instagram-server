
import chai from 'chai';
import chaiHttp from 'chai-http';

import {app} from '../src';

import core from './core';
import auth from './auth';
import post from './post';
import file from './file';

chai.use(chaiHttp);
chai.should();

core(app);
auth(app);
post(app);
file(app);
