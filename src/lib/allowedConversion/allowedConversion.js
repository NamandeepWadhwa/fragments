module.exports =  (currentType,requestedType) => {
  const imageSupport = ['png', 'jpeg', 'webp', 'avif', 'gif'];

 if(currentType==='text/plain' && requestedType==='txt') return true;
 if(currentType==='text/markdown'){
  if(requestedType==='md' || requestedType==='html' || requestedType==='txt') return true;
 }
 if(currentType==='text/html'){
  if(requestedType==='html' || requestedType==='txt') return true;
 }
 if(currentType==='text/csv'){
  if(requestedType==='csv' || requestedType==='txt' || requestedType==='json') return true;
 }
  if(currentType==='application/json'){
    if(requestedType==='json' || requestedType==='txt'|| requestedType==='yml' || requestedType==='yaml') return true;
  }
  if(currentType==='application/yaml'){
    if( requestedType==='yaml' || requestedType==='txt') return true;
  }
  if(currentType==='image/jpeg'){
    if(imageSupport.includes(requestedType)) return true;
  }
  return false;
};
