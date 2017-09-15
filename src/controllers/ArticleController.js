/*qinfeng*/

import TOOLS from '../utils/tools';
import ArticleService from '../services/ArticleService';

//get params(router 匹配)：ctx.params
//get url自带参数 ctx.query
//post请求使用 ctx.request.fields
// ctx.request.body,

const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

class ArticleController {

	static async getById (ctx) {
		console.log(ctx.params, ctx.query)
		let id = ctx.params.id;
    	let article = await ArticleService.getById(id);
		ctx.Json({data: article});
	}

	//GET
	static async pages (ctx) {
	    let conditions = ctx.getParams;
	    let pages = await ArticleService.pages(conditions);
	    pages.rows.map(m=>{
			m.dataValues.created_at = DateTimeF(m.created_at);
			return m;
	    })
		ctx.Pages({page: pages});
	}

	//POST
	static async insert (ctx) {
		await DELAY(3000);
		ctx.Json({data: 300, msg: '添加成功！'});
	}

	//PUT
	static async update (ctx) {
		await DELAY(3000)
		console.log('ctx.request', ctx.request.fields)
		const id = ctx.params.id;
		const inputs = ctx.request.fields;
		if(id){
			// const result = await ArticleService.update(model);
			ctx.Json({data: 'result'});
		}else{
			ctx.throw(400)
		}
			
	}

	//DELETE
	static async delete(ctx){
		// console.log(ctx.params)
		const id = ctx.params.id;
		// id = 0;
		if(id){
			const result = await ArticleService.delete(id);
			ctx.Json({data:result, msg: '删除成功!'});
		}else{
			ctx.throw(400);
		}
	}

	//GET
	static async proxy(ctx){
		const json = await http.get('/api/test/page');
		ctx.Json(json);
	}



	static async testSession(ctx) {
		// const json = await http.get('/v1/kaptcha/getKaptchaImage');
		const json = await http.post('/v1/userLogin/loginChecked', {
			username: 'qinfeng',
			password: '123456',
			captchaCode: '88888'
		});
		console.log('json', json)
		ctx.body = json;
	}

}

export default ArticleController;