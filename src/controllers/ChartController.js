/*xpioneer*/

import TOOLS from '../utils/tools';
import ChartService from '../services/ChartService';

const { DELAY, DateF, Guid, Guid8 } = TOOLS;

class ChartController {

  // 统计每天系统日志
  static async getSystemLog(ctx) {
    let model = await ChartService.getSystemLog();
    ctx.Json({ data: model });
  }

  // 每天系统日志分时统计
  static async getSystemLogDate(ctx) {
    const date = DateF(ctx.query['date']) || DateF(new Date());
    let model = await ChartService.getSystemLogDate(date);
    ctx.Json({ data: model });
  }

  // 统计文章类型
  static async getArticleType(ctx) {
    let model = await ChartService.getArticleType();
    ctx.Json({ data: model });
  }

  // 统计文章标签
  static async getArticleTag(ctx) {
    let model = await ChartService.getArticleTag();
    ctx.Json({ data: model });
  }

  // 获取全国的访问量
  static async getSystemLogChina(ctx) {
    const source = ctx.query['source'];
    let data = await ChartService.getSystemLogChina(source);
    data = data.map((item, index) => {
      item.subdivisions_name_zh = item.subdivisions_name_zh.replace('市', '').replace('省', '').replace('自治区', '')
      return item
    })
    return ctx.Json({ data });
  }

}

export default ChartController;
