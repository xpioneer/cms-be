import R from 'ramda';
import GeoIp from '../utils/tools/geoip';
import SystemLogService from '../services/SystemLogService';
import getClientType from '../utils/tools/clienttype'

const Logger = async(ctx, start, status, msg) => {
  if(ctx.url.indexOf('/api/systemlog') !== 0){
    let data = createModel(ctx);
    const ipInfo = await GeoIp.getModelGeoInfo(data.request_ip);
    data = R.merge(data, ipInfo);
    data.msg = msg || '';
    data.time = Date.now() - start;
    SystemLogService.insert(ctx, data, status);
  }
}

function createModel(ctx){
  let method = ctx.method;
  let userAgent = ctx.header['user-agent'];
  let ClientType = getClientType(userAgent);
  let data = {
    request_ip: ctx.header['x-real-ip'] || ctx.hostname,
    request_url: ctx.url,
    request_method: method,
    request_client: userAgent,
    client_type: ClientType.type,
    client_version: ClientType.version,
    host: ctx.host,
    hostname: ctx.header['x-host'],
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
      let params = JSON.stringify(ctx.request.fields);
      if(ctx.url.match(/^\/api\/login/) && method.match(/^POST$/)){
        params = params.replace(/"password":".+\b"/, '******');
      }
      if(ctx.url.match(/^\/api\/article(\/[\w]+|$)/) && method.match(/^PUT$|^POST$/)){
        params = (method.match(/^POST$/) ? '添加' : '更新') + '了一篇文章';
      }
      data.request_params = params;
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