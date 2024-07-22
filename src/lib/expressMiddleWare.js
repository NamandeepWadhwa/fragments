const express = require('express');
const contentType = require('content-type');
const { Fragment } = require('../model/fragment'); // Adjust the path as necessary
const logger = require('../logger');

const rawBody = () => express.raw({
  inflate: true,
  limit: '5mb',
  type: (req) => {
    try {

     
      const { type } = contentType.parse(req);
     logger.debug(`Content-Type: ${type}`);
      return Fragment.isSupportedType(type);
    } catch (error) {
      logger.error(error);
      return false;
    }
  },
});

module.exports = rawBody;
