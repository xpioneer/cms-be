import SystemLogService from '../services/SystemLogService';

const Logger = (ctx, start, status) => {
  const data = createModel(ctx);
  data.time = Date.now() - start;
  SystemLogService.insert(ctx, data, status)
}

function createModel(ctx){
  let method = ctx.method;
  let data = {
    request_ip: ctx.ip.substring(ctx.ip.lastIndexOf(':') + 1, ctx.ip.length),
    request_ip_v6: ctx.ip,
    request_url: ctx.url,
    request_method: method,
    request_client: ctx.header['user-agent'],
    host: ctx.host,
    hostname: ctx.hostname,
    path: ctx.path,
    request_header: JSON.stringify(ctx.header),
    protocol: ctx.protocol,
    origin: ctx.origin,
    protocol: ctx.protocol,
  };
  switch(method) {
    case 'GET':
      data.request_params = ctx.querystring;
      break;
    case 'POST':
    case 'PUT':
      data.request_params = JSON.stringify(ctx.request.fields);
      break;
    default:
      data.request_params = ctx.search;
      break;
  }
  return data;
}

export default Logger;

// // 解析上下文里node原生请求的POST参数
// function parsePostData( ctx ) {
//   return new Promise((resolve, reject) => {
//     try {
//       let postdata = "";
//       ctx.req.addListener('data', (data) => {
//         postdata += data
//       })
//       ctx.req.addListener("end",function(){
//         console.log(typeof postdata, 'end')
//         let parseData = parseQueryStr( postdata )
//         resolve( parseData )
//       })
//     } catch ( err ) {
//       reject(err)
//     }
//   })
// }

// // 将POST请求参数字符串解析成JSON
// function parseQueryStr( queryStr ) {
//   let queryData = {};
//   if(queryStr){
//     let queryStrList = queryStr.split('&');
//     for (  let [ index, queryStr ] of queryStrList.entries()  ) {
//       let itemList = queryStr.split('=')
//       queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
//     }
//   }    
//   return queryData
// }