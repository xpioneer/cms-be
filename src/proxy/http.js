// import http from 'http'

// const postData = JSON.stringify({
//   'msg' : 'Hello World!'
// });

// const options = {
// 	hostname: 'localhost',
// 	port: 9901,
// 	path: '/api/test/page',
// 	method: 'GET',
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded',
// 		// 'Content-Length': Buffer.byteLength(postData)
// 	}
// };

// const promise = () => new Promise((resolve, reject) => {

// 	const req = http.request(options, (res) => {
// 		console.log(`状态码: ${res.statusCode}`);
// 		console.log(`响应头: ${JSON.stringify(res.headers)}`);
// 		let resData = null;
// 		res.setEncoding('utf8');
// 		res.setHeader('Content-Type', 'application/json;charset=utf-8');
// 		res.on('data', (chunk) => {
// 			console.log(`响应主体: ${chunk}`);
// 			resData = chunk;
// 		});
// 		res.on('end', () => {
// 			console.log('响应中已无数据。');
// 			resolve(resData);
// 		});
// 	});
// 	req.on('error', (e) => {
// 	  	console.error(`请求遇到问题: ${e.message}`);
// 	  	reject(e)
// 	});

// 	// 写入数据到请求主体
// 	req.write(postData);
// 	req.end();
// });

// export default promise;

import fetch from 'node-fetch';

import httpConfig from '../../conf/httpConfig';

const commonReturn = (url, options) => {
  return new Promise((resolve,reject) => {
    try {
      (async () => {
        console.log(options);
        const res = await fetch(url, options);
        // console.log(res)
        const json = await res.json();
        resolve(json);
        console.log(json);
        // if(json.status == 200){
        // 	resolve(json);
        // }else{
        // 	reject(json);
        // }
				
      })();
    } catch (e) {
      reject(e);
    }
  });
};

const $http = {
  get(url, options) {
    return commonReturn(url, options);
  },
  post(url, options) {
    return commonReturn(url, options);
  },
  put(url, options) {
    return commonReturn(url, options);
  },
  delete(url, options) {
    return commonReturn(url, options);
  }
};

export default $http;
