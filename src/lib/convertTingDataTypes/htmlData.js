module.exports =  (data,requestedType) => {
  data=data.toString('utf-8');
  if(requestedType==='html'){
    const response = {
      data: data,
      type: 'text/html',
    };
    return response;
  }
  if(requestedType==='txt'){
    const response={
      data: data.replace(/<[^>]*>/g, ''),
      type: 'text/plain',
    }
    return response;
  }
}
