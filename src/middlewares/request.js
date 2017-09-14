let getParams = ctx =>{
  // console.log(`ctx.type:${ctx.type}, ctx.method:${ctx.method}`)
  let data = {};
  let query = ctx.query;
  if(query && Object.keys(query).length>0){
    data['limit'] = (query.per_page ? query.per_page : 1)*1;
    let current_page = (query.current_page ? query.current_page : 1) - 1;//offset start 0(如果不存在则只返回一条)
    let offset = (query.current_page < 1 ? 0 : current_page)*data['limit'];
    data['offset'] = offset*1;
    /*columnFilter*/
    if(query['columnFilter'] && query['columnFilter'].length>0){
      data['where'] = {};
      for(let columnFilter of query['columnFilter']){
        if(columnFilter.column === '_orFilter_'){
          data['where']['$or'] = columnFilter.value;
        }else{
          switch(columnFilter.exp){
            case 'like':
              data['where'][columnFilter.column] = { $like: `%${columnFilter.value}%` };break;
            case '>':
              data['where'][columnFilter.column] = { $gt: columnFilter.value };break;
            case '>=':
              data['where'][columnFilter.column] = { $gte: columnFilter.value };break;
            case '<':
              data['where'][columnFilter.column] = { $lt: columnFilter.value };break;
            case '<=':
              data['where'][columnFilter.column] = { $lte: columnFilter.value };break;
            case 'in':
              data['where'][columnFilter.column] = { $in: columnFilter.value };break;
            case '!=':
              data['where'][columnFilter.column] = { $ne: columnFilter.value };break;
            case '$or':
              data['where'][columnFilter.column] = { $or: columnFilter.value };break;
            case '=':
              data['where'][columnFilter.column] = columnFilter.value;break;
            default:
              data['where'][columnFilter.column] = columnFilter.value;break;
          }
        }
      }
    }
    /*order*/
    if(query['orderBy'] && query['orderBy'].length>0){
      data['order'] = [];
      let orders = query['orderBy'].map(o=>{
        return [o.column, o.dir]
      });
      data['order'] = orders
    }
  }
  // console.log('getParams-----------',data)
  return data;
}

let requestData = async (ctx, next) => {
  if(!ctx.getParams)
    ctx.getParams = getParams(ctx)
  await next();
}

export default requestData