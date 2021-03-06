/*xpioneer*/

import TOOLS from '../utils/tools';
import ArticleService from '../services/ArticleService';

//get params(router 匹配)：ctx.params
//get url自带参数 ctx.query
//post请求使用 ctx.request.fields
// ctx.request.body,
// console.log(BaseCtrl)
const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

class ArticleController {

  static async getById(ctx) {
    // console.log(ctx.params, ctx.query)
    let id = ctx.params.id;
    let article = await ArticleService.getById(id);
    if (article)
      ctx.Json({ data: article });
    else
      ctx.throw(404);
  }

  //GET
  static async pages(ctx) {
    let conditions = ctx.getParams;
    let pages = await ArticleService.pages(conditions);
    pages.rows.map(m => {
      m.created_at = DateTimeF(m.created_at);
      return m;
    });
    ctx.Pages({ page: pages });
  }

  //POST
  static async insert(ctx) {
    const inputs = ctx.request.fields;
    let model = {
      title: inputs.title,
      abstract: inputs.abstract,
      is_original: inputs.is_original,
      type_id: inputs.type_id,
      is_top: inputs.is_top,
      content: inputs.content,
      pics: inputs.pics,
      tag: inputs.tag,
      created_by: ctx.session['CUR_USER'].id
    };
    const result = await ArticleService.insert(model);
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
      const result = await ArticleService.update(model);
      console.log(result);
      ctx.Json({ data: result[0] });
    } else {
      ctx.throw(400);
    }

  }

  //DELETE
  static async delete(ctx) {
    ctx.throw(500);
    const id = ctx.params.id;
    if (id) {
      const result = await ArticleService.delete(id, ctx);
      ctx.Json({ data: result[0], msg: '删除成功!' });
    } else {
      ctx.throw(400);
    }
  }

}

export default ArticleController;
