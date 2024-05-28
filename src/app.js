const express = require('express');
const cros = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const logger = require('./logger');
const pino = require('pino-http')(logger);
const app = express();
app.use(pino);
app.use(cros());
app.use(helmet());
const passport = require('passport');
const authenticate = require('./auth');
app.use(compression());
passport.use(authenticate.strategy());
app.use(passport.initialize());
const response = require('./response');

app.use('/', require('./routes'));
// Add 404 middleware to handle any requests for resources that can't be found
app.use((req, res) => {

  res.status(404).json(response.createErrorResponse(404, 'not found'));
});

// Add error-handling middleware to deal with anything else
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // We may already have an error response we can use, but if not,
  // use a generic `500` server error and message.
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  // If this is a server error, log something so we can see what's going on.
  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(404).json(response.createErrorResponse(status, message));
});

// Export our `app` so we can access it in server.js
module.exports = app;
