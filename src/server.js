const stoppable=require('stoppable');

const app = require('./app');
const logger = require('./logger');
const port = parseInt(process.env.PORT || '8080', 10);
const server = stoppable(
  app.listen(port, () => {
    // Log a message that the server has started, and which port it's using.
    logger.info(`Server started on port ${port}`);
  })
);
module.exports = server;
