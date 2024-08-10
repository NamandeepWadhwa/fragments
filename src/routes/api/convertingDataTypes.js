const { Fragment } = require('../../model/fragment');
const response = require('../../response');
const isAllowed = require('../../lib/allowedConversion/allowedConversion');
const convertingHtml= require('../../lib/convertTingDataTypes/htmlData');
const convertingJson = require('../../lib/convertTingDataTypes/jsonData');
const convertingMd = require('../../lib/convertTingDataTypes/mdData');
const yamlData = require('../../lib/convertTingDataTypes/yamlDatt');
const csvData = require('../../lib/convertTingDataTypes/csvData');
const imageData = require('../../lib/convertTingDataTypes/imageData');

module.exports = async (req, res) => {

  const id = req.params.id;
  const ownerId = req.user;
  const ext = req.params.ext;

  try {
    const fragment = await Fragment.byId(ownerId, id);

    if (!isAllowed(fragment.type, ext)) {
      res.status(415).json(response.createErrorResponse(415, 'Unsupported conversion'));
      return;
    }
    let data = await fragment.getData();
    let sendingDataType = fragment.type;
    if (fragment.type === 'application/json') {
      const response = convertingJson(data, ext);
      sendingDataType = response.type;
      data = response.data;
      res.setHeader('Content-Type', sendingDataType);
      res.setHeader('Content-Length', fragment.size);
      res.status(200).send(data);
      return;
    }
    if(fragment.type === 'text/html') {
      const response = convertingHtml(data, ext);
      sendingDataType = response.type;
      data = response.data;
      
      res.setHeader('Content-Type', sendingDataType);
      res.setHeader('Content-Length', fragment.size);
      res.status(200).send(data);
      return;

    }

    if (fragment.type === 'text/markdown') {
      const response=convertingMd(data, ext);
      sendingDataType = response.type;
      data = response.data;
    res.setHeader('Content-Type', sendingDataType);
    res.setHeader('Content-Length', fragment.size);
    res.status(200).send(data);
    return
    }
    if(fragment.type === 'application/yaml') {
      console.log('yaml');
      const response = yamlData(data, ext);
      sendingDataType = response.type;
      data = response.data;
      res.setHeader('Content-Type', sendingDataType);
      res.setHeader('Content-Length', fragment.size);
      res.status(200).send(data);
      return;
    }
    if(fragment.type === 'text/csv') {
      const response = csvData(data, ext);
      sendingDataType = response.type;
      data = response.data;
      res.setHeader('Content-Type', sendingDataType);
      res.setHeader('Content-Length', fragment.size);
      res.status(200).send(data);
      return;
    }
    if(fragment.type==='text/plain'){
      data=data.toString('utf-8');
      res.setHeader('Content-Type', sendingDataType);
      res.setHeader('Content-Length', fragment.size);
      res.status(200).send(data);
      return;
    }
    if(fragment.type.includes('image')) {
      const response = await imageData(data, ext);
      sendingDataType = response.type;
      data = response.data;
      console.log('data', data, sendingDataType);
      res.setHeader('Content-Type', sendingDataType);
      res.setHeader('Content-Length', fragment.size);
      res.status(200).send(data);
      return
    }
    res.send(415).json(response.createErrorResponse(415, 'Unsupported conversion'));
  } catch (err) {
    console.log(err);
    res.status(500).json(response.createErrorResponse(500, err));
  }
};
