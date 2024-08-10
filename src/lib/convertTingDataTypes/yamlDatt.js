const yaml = require('js-yaml');


// Convert JSON to pretty-printed plain text
const jsonToText = (json, indent = 2) => {
  const spacing = ' '.repeat(indent);
  if (typeof json === 'object' && json !== null) {
    return Object.entries(json)
      .map(([key, value]) => {
        const formattedValue =
          typeof value === 'object' && value !== null
            ? `\n${jsonToText(value, indent + 2)}`
            : ` ${value}`;
        return `${spacing}${key}:${formattedValue}`;
      })
      .join('\n');
  } else {
    return `${spacing}${json}`;
  }
};


module.exports = (data, requestedType) => {
  console.log('requestedType', requestedType);
  try {
    data = data.toString('utf-8');

    if (requestedType === 'yaml' || requestedType === 'yml') {
      const response = {
        data: data,
        type: 'application/yaml',
      };
      return response;
    }

    if (requestedType === 'txt') {
      const jsonData = yaml.load(data);
      console.log('jsonData', jsonData);
      return {
        data: jsonToText(jsonData), // Convert JSON to plain text
        type: 'text/plain',
      };
    }

    throw new Error(`Unsupported requestedType: ${requestedType}`);
  } catch (e) {
    console.error(e);
    throw new Error(`Error processing data: ${e.message}`);
  }
};
