/*xpioneer*/
import R from 'ramda';
import TOOLS from '../utils/tools';
import GeoIp from '../utils/tools/geoip';
import SystemLogService from '../services/SystemLogService';

//get params(router 匹配)：ctx.params
//get url自带参数 ctx.query
//post请求使用 ctx.request.fields
// ctx.request.body,
// console.log(BaseCtrl)
const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

class SystemLogController {

  static async getById(ctx) {
    let id = ctx.params.id;
    let systemlog = await SystemLogService.getById(id);
    if (systemlog) {
      const model = {
        id: systemlog.id,
        request_ip: systemlog.request_ip,
        request_url: systemlog.request_url,
        request_params: systemlog.request_params,
        request_method: systemlog.request_method,
        request_client: systemlog.request_client,
        client_type: systemlog.client_type,
        client_version: systemlog.client_version,
        host: systemlog.host,
        hostname: systemlog.hostname,
        path: systemlog.path,
        request_header: systemlog.request_header,
        protocol: systemlog.protocol,
        origin: systemlog.origin,
        protocol: systemlog.protocol,
        time: systemlog.time,
        msg: systemlog.msg,
        created_at: DateTimeF(systemlog.created_at),
        created_by: DateTimeF(systemlog.created_by),
        creator: systemlog.creator
      };
      ctx.Json({ data: model });
    }
    else
      ctx.throw(404);
  }

  //GET
  static async pages(ctx) {
    let conditions = ctx.getParams;
    let pages = await SystemLogService.pages(conditions);
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
      tag: inputs.tag,
      created_by: ctx.session['CUR_USER'].id
    };
    const result = await SystemLogService.insert(model);
    ctx.Json({ data: result[0], msg: '添加成功！' });
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
      const result = await SystemLogService.update(model);
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
      const result = await SystemLogService.delete(id, ctx);
      ctx.Json({ data: result[0], msg: '删除成功!' });
    } else {
      ctx.throw(400);
    }
  }

  // 更新ip地址
  static async updateGeoIp(ctx) {
    const list = await SystemLogService.findAllEN();
    let counter = 0;
    if (list.length > 0) {
      list.forEach(async (v, i) => {
        const ipInfo = await GeoIp.getModelGeoInfo(v.request_ip);
        const model = R.merge(R.concat, v.dataValues, ipInfo);
        console.log(model);
        model['updated_at'] = Date.now();
        model['updated_by'] = ctx.session['CUR_USER'].id;
        await SystemLogService.updateModel(model);
        counter++;
      });
      ctx.Json({ data: counter, msg: '更新成功!' });
    } else {
      ctx.Json({ data: 0, msg: '更新成功!' });
    }
  }

}

export default SystemLogController;
