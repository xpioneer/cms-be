/*qinfeng*/
import R from 'ramda';
import DB from '../models'

class ChartDao {

    // 统计每天系统日志数量
    static async getSystemLog() {
        const list = await DB.sequelize.query(`
            SELECT DATE(FROM_UNIXTIME(s.created_at/1000)) as date, count(s.id) total
            FROM system_log s
            GROUP BY DATE(FROM_UNIXTIME(s.created_at/1000));`, {
                type: 'SELECT'
        });
        if(list.length > 0){
            return list;
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
        if(list.length > 0){
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
        if(list.length > 0){
            return list;
        }
        return [];
    }

}

export default ChartDao;