/*xpioneer*/
import R from 'ramda';
import DB from '../models';

class ChartDao {

  // 统计每天系统日志数量
  static async getSystemLog() {
    const list = await DB.sequelize.query(`
            SELECT DATE(FROM_UNIXTIME(s.created_at/1000)) as date, count(s.id) total
            FROM system_log s
            GROUP BY DATE(FROM_UNIXTIME(s.created_at/1000));`, {
        type: 'SELECT'
      });
    if (list.length > 0) {
      return list;
    }
    return [];
  }

  // 每天系统日志分时统计
  static async getSystemLogDate(date) {
    const list = await DB.sequelize.query(`
            SELECT DATE_FORMAT(FROM_UNIXTIME(created_at/1000), '%Y-%m-%d') as 'date',
                count(s.id) as 'total',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='0' or null ) as '0时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='1' or null ) as '1时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='2' or null ) as '2时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='3' or null ) as '3时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='4' or null ) as '4时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='5' or null ) as '5时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='6' or null ) as '6时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='7' or null ) as '7时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='8' or null ) as '8时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='9' or null ) as '9时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='10' or null ) as '10时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='11' or null ) as '11时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='12' or null ) as '12时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='13' or null ) as '13时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='14' or null ) as '14时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='15' or null ) as '15时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='16' or null ) as '16时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='17' or null ) as '17时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='18' or null ) as '18时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='19' or null ) as '19时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='20' or null ) as '20时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='21' or null ) as '21时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='22' or null ) as '22时',
                count(HOUR(FROM_UNIXTIME(created_at/1000))='23' or null ) as '23时'
            FROM system_log s
            GROUP BY DATE_FORMAT(FROM_UNIXTIME(created_at/1000), '%Y-%m-%d')
            HAVING date = Date_format(?, '%Y-%m-%d');
        `, {
        replacements: [date],
        type: 'SELECT'
      });
    if (list.length > 0) {
      return list[0];
    }
    return [];
  }

  // 统计文章类型分类
  static async getArticleType() {
    const list = await DB.sequelize.query(`
            select count(a.id) total, a_t.type_name
                from article a
                left join article_type a_t on a.type_id = a_t.id
            group by type_id;`, {
        type: 'SELECT'
      });
    if (list.length > 0) {
      return list;
    }
    return [];
  }

  // 统计文章标签分类
  static async getArticleTag() {
    const list = await DB.sequelize.query(`
            select count(a.id) total, t.name
                from article a
                left join tag t on instr(a.tag, t.name) > 0
            group by t.id;`, {
        type: 'SELECT'
      });
    if (list.length > 0) {
      return list;
    }
    return [];
  }

}

export default ChartDao;
