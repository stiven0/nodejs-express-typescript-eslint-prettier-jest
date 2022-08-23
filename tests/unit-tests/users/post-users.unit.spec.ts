import { Application } from 'express';
import request from 'supertest';

import { mockUser } from '../../helpers/users-helpers';
import { getApp } from '../../helpers/server-helpers';
import { UserModel } from '../../../src/utils/interfaces/user';

describe('POST /users ', () => {
  let app: Application;
  let user: Partial<UserModel>;

  beforeAll(async () => {
    app = await getApp();
    user = mockUser();
  });

  xit('should return a 201 status code when calling the "/users" route', function (done) {
    request(app)
      .post('/api/v1/users')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
});
