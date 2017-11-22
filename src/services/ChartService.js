/*qinfeng*/
import ChartDao from '../daos/ChartDao'

class ChartService {

    static async getSystemLog() {
        return await ChartDao.getSystemLog();
    }

    static async getArticleType() {
        return await ChartDao.getArticleType();
    }
    
    static async getArticleTag() {
        return await ChartDao.getArticleTag();
    }
}

export default ChartService;