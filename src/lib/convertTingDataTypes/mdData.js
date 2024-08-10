const markdown=require('markdown-it');
module.exports =  (data,requestedType) => {
  data=data.toString('utf-8');
  const md = new markdown();
  if(requestedType==='md'){
    const response = {
      data: data,
      type: 'text/markdown',
    };
    return response;
  }
  if(requestedType==='html'){
    console.log(md.render(data));
    const response = {
      data: md.render(data),
      type: 'text/html',
    };
    return response;
  }
  if(requestedType==='txt'){
    data=md.render(data).replace(/<[^>]*>/g, '');

    const response = {
      data: data,
      type: 'text/plain',
    };
    return response;
  }
  throw new Error(`Unsupported type: ${requestedType}`);
}
