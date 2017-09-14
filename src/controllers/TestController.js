import TOOLS from '../utils/tools'

//http
// import http from '../proxy/http'

// const testproxy = () => new Promise((resolve, reject) => {
// 	console.log(http.get, http.post)
// 	http.get('http://localhost:9901/api/test/page',(req,res) => {
// 	    let json='';
// 	    req.on('data',function(data){
// 	        json+=data;
// 	    });
// 	    req.on('end',function(){
// 	        console.log(typeof json);
// 	        resolve(json);
// 	    });
// 	}).on('error', (e) => {
// 	  	console.error(`错误: ${e.message}`);
// 	  	reject(e);
// 	});
// });

const { DELAY } = TOOLS;

let list = [{
						status: 1,
					  name: '王小明',
					  age: 18,
					  address: '北京市朝阳区芍药居'
					},
					{
						status: 2,
					  name: '张小刚',
					  age: 25,
					  address: '北京市海淀区西二旗'
					},
					{
						status: 3,
					  name: '李小红',
					  age: 30,
					  address: '上海市浦东新区世纪大道'
					},
					{
						status: 1,
					  name: '周小伟',
					  age: 26,
					  address: '深圳市南山区深南大道'
					},{
						status: 2,
					  name: '王小明1',
					  age: 18,
					  address: '北京市朝阳区芍药居'
					},
					{
						status: 3,
					  name: '张小刚2',
					  age: 25,
					  address: '北京市海淀区西二旗'
					},
					{
						status: 1,
					  name: '李小红3',
					  age: 30,
					  address: '上海市浦东新区世纪大道'
					},
					{
						status: 2,
					  name: '周小伟4',
					  age: 26,
					  address: '深圳市南山区深南大道'
					}];
let nums = [{s:0, e: 3}, {s:2, e: 3}, {s:4, e: 8}];
let i = 0;

class TestController {

  static async index(ctx){//测试页面
    await ctx.render('index', {
      title: '首页',
      orderList: [{id:1, name:'hehe1'},{id:2, name:'hehe2'},{id:3, name:'hehe3'}],
      copyright: 'Keefe'
    });
  }

  static async testmock(ctx){
  	ctx.Json({data:list, msg:'查询成功!'})
  }

  static async pages(ctx){
  	console.log(ctx.query)
  	let address = ctx.query.address;
  	let status = ctx.query.status;
  	let name = ctx.query.name;
  	let age = ctx.query.age;
  	let _list = [];
  	list.forEach((v, k)=>{
  		v.id = ++k;
  		v.status_desc = v.status == 1 ? '构建中' : v.status == 2 ? '构建成功' : '构建失败';
  	});
  	// _list = list.filter(item => {
  	// 	return item.address.match(address) && item.status == status && item.name.match(name) && item.age == age;
  	// });
  	_list = list.filter(item => {
  		if(address){
  			return item.address.match(address);
  		}else{
  			return true;
  		}
  	}).filter(item => {
  		if(status){
  			return item.status == status;
  		}else{
  			return true;
  		}
  	}).filter(item => {
  		if(name){
  			return item.name.match(name);
  		}else{
  			return true;
  		}
  	}).filter(item => {
  		if(age){
  			return item.age == age;
  		}else{
  			return true;
  		}
  	})
  	// const bb = 9;
  	// bb = 10;
  	let json = {
  		rows: _list,
  		// rows: list.slice(nums[i].s, nums[i].e),
			count: 8
  	};
  	i>=2?i=0:i++;
  	ctx.Pages({page:json, msg: '查询成功!', meta: {}});
  }

  static async delete(ctx){
  	await DELAY(500);
  	ctx.Json({data:1, msg: '删除成功!'});
  }

  static async proxy(ctx){
  	// const json = await http.get('/api/test/page');
  	ctx.Json('json');
  }

  static async attack(ctx){
    for(let i = 1; i <= 1; i++){
      let r = await http.post('http://116.62.70.123:8080/LoanMarket/v1/user/list', {
        'DNF-ST-BT-AT': '6040CB0ADD151F4B7C73CA27EAC5B40A359F2AA056810A125218678C24CF5D8224F3261581DB1EAF511DF431923E1973BC2C408C7BC6598A87ADE13F43C48F4585D70F824ECEDA4584EC14DAD8357A8FE9AEFB5688D1AA3CF699449B0C2C6AE90107ADF34F47DA88A2DF6E2EA356DEC5CE83540C12CB0881826CB71732DF49BEDF74707D6FBE36FA923EFE35C304012AA1C0E6DEF7E05DE10419E283692C78FAC6860746D77DC4649A8AB355B0F22F19C41F001E58964E03561255AF662A549B7EFA001D7CD5D7B3',
        'Content-Type': 'application/json; charset=UTF-8',
        'Cookie': 'LQ-DKCS-UT=U2FSDGVKX1/BDP9PKT+G5Y7Y6NKTL2HBBSXJ3CF4RCSlxbSLD_UA; Date=Wed%2C%2002%20Aug%202017%2003%3A12%3A45%20GMT; Server=Apache-Coyote/1.1; Content-Length=3564; Content-Type=application/json%3Bcharset%3Dutf-8',
        'X-Requested-With': 'XMLHttpRequest'
      });
    }
    // const json = await http.post('http://116.62.70.123:8080/LoanMarket/v1/user/list', {
    //   'DNF-ST-BT-AT': '6040CB0ADD151F4B7C73CA27EAC5B40A359F2AA056810A125218678C24CF5D8224F3261581DB1EAF511DF431923E1973BC2C408C7BC6598A87ADE13F43C48F4585D70F824ECEDA4584EC14DAD8357A8FE9AEFB5688D1AA3CF699449B0C2C6AE90107ADF34F47DA88A2DF6E2EA356DEC5CE83540C12CB0881826CB71732DF49BEDF74707D6FBE36FA923EFE35C304012AA1C0E6DEF7E05DE10419E283692C78FAC6860746D77DC4649A8AB355B0F22F19C41F001E58964E03561255AF662A549B7EFA001D7CD5D7B3',
    //   'Content-Type': 'application/json; charset=UTF-8',
    //   'Cookie': 'LQ-DKCS-UT=U2FSDGVKX1/BDP9PKT+G5Y7Y6NKTL2HBBSXJ3CF4RCSlxbSLD_UA; Date=Wed%2C%2002%20Aug%202017%2003%3A12%3A45%20GMT; Server=Apache-Coyote/1.1; Content-Length=3564; Content-Type=application/json%3Bcharset%3Dutf-8',
    //   'X-Requested-With': 'XMLHttpRequest'
    // });
    ctx.Json({data:'hehe'});
  }

  // static async testSession(ctx){
  //   console.log(ctx.session, 'testSession testSession testSession', typeof ctx.session)
  //   if(!ctx.session['userInfo']){
  //     ctx.session['userInfo'] = {
  //       user_id: '123456789',
  //       count: 1
  //     }
  //   }
  //   // else{
  //   //   ctx.session.count = ctx.session.count + 1;
  //   // }
  //   let session = ctx.session;
  //   ctx.Json({data: session})
  // }

  // static async testSession1(ctx){
  //   let session = ctx.session;//['userInfo'];
  //   ctx.Json({data: session});
  // }


  static async test200(ctx){
    // const json = await http.get('/api/test/page');
    ctx.Json({data:'这里是你需要的数据。', msg: '请求成功', status: 200});
  }

  static async test400(ctx){
    // ctx.Json({data:'错误请求', msg: 'Bad Request', status: 400});
    ctx.throw(400)
  }

  static async test401(ctx){
    // ctx.Json({data:'未授权', msg: 'Unauthorized', status: 401});
    ctx.throw(401)
  }

  static async test403(ctx){
    // ctx.Json({data:'禁止访问', msg: 'Forbidden', status: 403});
    ctx.throw(403);
  }

  static async test404(ctx){
    // ctx.Json({data:'未找到', msg: 'Not Found', status: 404});
    ctx.throw(404)
  }

  static async test405(ctx){
    // ctx.Json({data:'此方法不允许', msg: 'Method Not Allowed', status: 405});
    ctx.throw(405)
  }

  static async test406(ctx){
    // ctx.Json({data:'不可接受的', msg: 'Not Acceptable', status: 406});
    ctx.throw(406)
  }

  static async test500(ctx){
    // ctx.throw(500);
    // ctx.Json({data:'服务器内部错误', msg: '请求错误', status: 500});
    ctx.throw(500)
  }

  static async test501(ctx){
    // ctx.throw(500);
    // ctx.Json({data:'服务器内部错误', msg: '请求错误88', status: 501});
    ctx.throw(501)
  }
}


export default TestController;