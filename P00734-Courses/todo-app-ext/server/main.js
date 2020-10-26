import { ExpressConfig } from './server-config/express.config.js'

(() => {
  const expressConfig = new ExpressConfig();
  expressConfig
    .config()
    .start();

})()
