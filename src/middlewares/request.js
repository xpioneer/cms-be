let getParams = ctx =>{
  let data = {};
  let query = ctx.query;
  console.log(query, '999')
  if(query && Object.keys(query).length>0){
    data['limit'] = (query.per_page ? query.per_page : 1)*1;
    let current_page = (query.current_page ? query.current_page : 1) - 1;//offset start 0(如果不存在则只返回一条)
    let offset = (query.current_page < 1 ? 0 : current_page)*data['limit'];
    data['offset'] = offset*1;
    /*colFilter*/
    if(query['colFilter'] && query['colFilter'].length>0){
      data['where'] = {};
      for(let colFilter of query['colFilter']){
        if(colFilter.col === '_orFilter_'){
          data['where']['$or'] = colFilter.val;
        }else{
          switch(colFilter.exp){
            case 'like':
              data['where'][colFilter.col] = { $like: `%${colFilter.val}%` };break;
            case '>':
              data['where'][colFilter.col] = { $gt: colFilter.val };break;
            case '>=':
              data['where'][colFilter.col] = { $gte: colFilter.val };break;
            case '<':
              data['where'][colFilter.col] = { $lt: colFilter.val };break;
            case '<=':
              data['where'][colFilter.col] = { $lte: colFilter.val };break;
            case 'in':
              data['where'][colFilter.col] = { $in: colFilter.val };break;
            case '!=':
              data['where'][colFilter.col] = { $ne: colFilter.val };break;
            case '$or':
              data['where'][colFilter.col] = { $or: colFilter.val };break;
            case '=':
              data['where'][colFilter.col] = colFilter.val;break;
            default:
              data['where'][colFilter.col] = colFilter.val;break;
          }
        }
      }
    }
    /*order*/
    if(query['orderBy'] && query['orderBy'].length>0){
      data['order'] = [];
      let orders = query['orderBy'].map(o=>{
        return [o.col, o.dir]
      });
      data['order'] = orders
    }
  }
  return data;
}

let requestData = async (ctx, next) => {
  if(!ctx.getParams)
    ctx.getParams = getParams(ctx)
  await next();
}

export default requestData