import { connect } from 'mongoose';
import chalk from 'chalk';

import app from './app';
import { CONFIG } from './utils/config';

const startServer = async () => {
  try {
    await connect(String(CONFIG.DATABASE));
    console.log(chalk.bgBlackBright('Database connection established'));

    app.listen(CONFIG.PORT, async () => {
      console.log(chalk.bgBlueBright(`Server running on the port: ${CONFIG.PORT}`));
      console.log(chalk.bgMagenta(`${CONFIG.ENVIRONMENT === 'development' ? 'mode development' : 'mode production'}`));
    });
  } catch (err) {
    console.log('Error occurred when starting the server', err);
  }
};

startServer();
