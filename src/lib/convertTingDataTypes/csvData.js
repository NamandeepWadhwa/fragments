const { parse } = require('csv-parse/sync');// Import the synchronous version of csv-parse

module.exports = (data, requestedType) => {
  // Convert Buffer to string
  data = data.toString('utf-8');

  // Parse CSV data
  const records = parse(data, {
    columns: true, // Use the first row as column names
    skip_empty_lines: true,
  });

  if (requestedType === 'csv') {
    const response = {
      data: data,
      type: 'text/csv',
    };
    return response;
  }

  if (requestedType === 'json') {
    console.log(records);
    const response = {
      data: JSON.stringify(records, null, 2), // Pretty-print JSON with 2 spaces
      type: 'application/json',
    };
    return response;
  }

  if (requestedType === 'txt') {
    const plainText = records
      .map((record) => {
        return Object.entries(record)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
      })
      .join('\n\n');

    const response = {
      data: plainText,
      type: 'text/plain',
    };
    return response;
  }

  throw new Error('Unsupported requestedType: ' + requestedType);
};
