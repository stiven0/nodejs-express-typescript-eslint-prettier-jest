import { Application } from 'express';
import { connect } from 'mongoose';

import app from '../../src/app';
import { CONFIG } from '../../src/utils/config';

export const getApp = async (): Promise<Application> => {
  let appInstance: Application = app;
  await connect(String(CONFIG.DATABASE));
  return appInstance;
};
