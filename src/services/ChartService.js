/*xpioneer*/
import ChartDao from '../daos/ChartDao';

class ChartService {

  static async getSystemLog() {
    return await ChartDao.getSystemLog();
  }

  static async getSystemLogDate(date) {
    return await ChartDao.getSystemLogDate(date);
  }

  static async getArticleType() {
    return await ChartDao.getArticleType();
  }
    
  static async getArticleTag() {
    return await ChartDao.getArticleTag();
  }

  static async getSystemLogChina(source) {
    return await ChartDao.getSystemLogChina(source);
  }
}

export default ChartService;
