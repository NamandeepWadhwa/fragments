const jsYaml = require('js-yaml');



// Convert JSON to pretty-printed plain text
const jsonToText = (json, indent = 2) => {
  const spacing = ' '.repeat(indent);
  if (typeof json === 'object' && json !== null) {
    return Object.entries(json)
      .map(
        ([key, value]) =>
          `${spacing}${key}: ${
            typeof value === 'object' && value !== null
              ? '\n' + jsonToText(value, indent + 2)
              : value
          }`
      )
      .join('\n');
  } else {
    return `${spacing}${json}`;
  }
};

module.exports = (data, requestedType) => {
  
  console.log('requestedType', requestedType);
  try {
    const jsonData = JSON.parse(data.toString('utf-8'));
    console.log('data', data);

    if (requestedType === 'json') {
      const response = {
        data: jsonData, // Pretty-print JSON
        type: 'application/json',
      };
      return response;
    }

    if (requestedType === 'yaml' || requestedType === 'yml') {
      console.log(jsYaml.dump(jsonData));
      const response = {
        data: jsYaml.dump(jsonData),
        type: 'application/yaml',
      };
      return response;
    }

    if (requestedType === 'txt') {
      const response = {
        data: jsonToText(jsonData),
        type: 'text/plain',
      };
      return response;
    }

    throw new Error(`Unsupported requestedType: ${requestedType}`);
  } catch (e) {
    console.error(e);
    throw new Error(`Error processing data: ${e.message}`);
  }
};
