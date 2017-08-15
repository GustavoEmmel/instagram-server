
import chai from 'chai';
import chaiHttp from 'chai-http';

import {app} from '../src';

import core from './core';
import auth from './auth';

chai.use(chaiHttp);
chai.should();

core(app);
auth(app);
