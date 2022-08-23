import { Application } from 'express';

import { getApp } from '../helpers/server-helpers';

describe('testing server', () => {
  let app: Application;

  beforeAll(async () => {
    app = await getApp();
  });

  it('should return true if the server is exist', async () => {
    expect(app['listen']).toBeTruthy();
  });
});
