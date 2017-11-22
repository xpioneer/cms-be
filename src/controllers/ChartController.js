/*qinfeng*/

import TOOLS from '../utils/tools';
import ChartService from '../services/ChartService';

const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

class ChartController {

    // 统计每天系统日志
    static async getSystemLog(ctx) {
        let model = await ChartService.getSystemLog();
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

}

export default ChartController;