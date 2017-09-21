/*qinfeng*/

import TOOLS from '../utils/tools';
import ArticleTypeService from '../services/ArticleTypeService';

//get params(router 匹配)：ctx.params
//get url自带参数 ctx.query
//post请求使用 ctx.request.fields
// ctx.request.body,

const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

class ArticleController {

    // GET
    static async getById(ctx) {
        let id = ctx.params.id;
        let article = await ArticleTypeService.getById(id);
        const model = {
            id: article.id,
            type_name: article.type_name,
            remark: article.remark
        }
        ctx.Json({ data: model });
    }

    // GET
    static async pages(ctx) {
        if (!ctx.getParams.order || ctx.getParams.order.length == 0) {
            ctx.getParams.order = [
                ['created_at', 'desc']
            ];
        }
        let conditions = ctx.getParams;
        let pages = await ArticleTypeService.pages(conditions);
        pages.rows.map(m => {
            m.dataValues.created_at = DateTimeF(m.created_at);
            return m;
        })
        ctx.Pages({ page: pages });
    }

    // POST
    static async insert(ctx) {
        const inputs = ctx.request.fields;
        let model = {
            type_name: inputs.type_name,
            remark: inputs.remark
        }
        const result = await ArticleTypeService.insert(model);
        ctx.Json({ data: result, msg: '添加成功！' });
    }

    // PUT
    static async update(ctx) {
        const id = ctx.params.id;
        if (id) {
            const inputs = ctx.request.fields;
            const result = await ArticleTypeService.update(id, inputs);
            ctx.Json({ data: result[0] });
        } else {
            ctx.throw(400)
        }

    }

    // DELETE
    static async delete(ctx) {
        // console.log(ctx.params)
        const id = ctx.params.id;
        // id = 0;
        if (id) {
            const result = await ArticleTypeService.delete(id);
            ctx.Json({ data: result, msg: '删除成功!' });
        } else {
            ctx.throw(400);
        }
    }

}

export default ArticleController;