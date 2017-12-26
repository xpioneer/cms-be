/*xpioneer*/

import TOOLS from '../utils/tools';
import CommentService from '../services/CommentService';

//get params(router 匹配)：ctx.params
//get url自带参数 ctx.query
//post请求使用 ctx.request.fields
// ctx.request.body,
// console.log(BaseCtrl)
const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

class CommentController {

    static async getById(ctx) {
        let id = ctx.params.id;
        let model = await CommentService.getById(id);
        if(model){
            const comment = {
                id: model.id,
                article_id: model.article_id,
                article: model.article,
                content: model.content,
                parent_id: model.parent_id,
                ip: model.ip,
                client: model.client,
                created_at: DateTimeF(model.created_at),
                created_by: model.created_by,
                creator: model.creator
            }
            ctx.Json({ data: comment });
        }
        else
            ctx.throw(404)
    }

    //GET
    static async pages(ctx) {
        let conditions = ctx.getParams;
        const query = ctx.query;
        let pages = await CommentService.pages(conditions, {...ctx.query});
        pages.rows.map(m => {
            m.created_at = DateTimeF(m.created_at);
            return m;
        })
        ctx.Pages({ page: pages });
    }

    //POST
    static async insert(ctx) {
        const inputs = ctx.request.fields;
        let model = {
            article_id: inputs.article_id,
            content: inputs.content,
            parent_id: inputs.parent_id,
            ip: ctx.header['x-real-ip'] || ctx.hostname,
            client: ctx.header['user-agent'],
            created_by: ctx.session['CUR_USER'].id,
            updated_by: ctx.session['CUR_USER'].id
        }
        const result = await CommentService.insert(model);
        ctx.Json({ data: result.id, msg: '添加成功！' });
    }

    //PUT
    static async update(ctx) {
        const id = ctx.params.id;
        const inputs = ctx.request.fields;
        if (id) {
            const model = {
                id: inputs.id,
                title: inputs.title,
                abstract: inputs.abstract,
                type_id: inputs.type_id,
                is_top: inputs.is_top,
                pics: inputs.pics,
                content: inputs.content,
                is_original: inputs.is_original,
                tag: inputs.tag,
                updated_by: ctx.session['CUR_USER'].id
            };
            const result = await CommentService.update(model);
            console.log(result)
            ctx.Json({ data: result[0] });
        } else {
            ctx.throw(400)
        }

    }

    //DELETE
    static async delete(ctx) {
        ctx.throw(500);
        const id = ctx.params.id;
        if (id) {
            const result = await CommentService.delete(id, ctx);
            ctx.Json({ data: result[0], msg: '删除成功!' });
        } else {
            ctx.throw(400);
        }
    }

}

export default CommentController;