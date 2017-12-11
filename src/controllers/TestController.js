import GeoIp from '../utils/tools/geoip';
import TOOLS from '../utils/tools'

const { DELAY } = TOOLS;

let list = [{
        status: 1,
        name: '王小明',
        age: 18,
        address: '北京市朝阳区芍药居'
    },
    {
        status: 2,
        name: '张小刚',
        age: 25,
        address: '北京市海淀区西二旗'
    },
    {
        status: 3,
        name: '李小红',
        age: 30,
        address: '上海市浦东新区世纪大道'
    },
    {
        status: 1,
        name: '周小伟',
        age: 26,
        address: '深圳市南山区深南大道'
    }, {
        status: 2,
        name: '王小明1',
        age: 18,
        address: '北京市朝阳区芍药居'
    },
    {
        status: 3,
        name: '张小刚2',
        age: 25,
        address: '北京市海淀区西二旗'
    },
    {
        status: 1,
        name: '李小红3',
        age: 30,
        address: '上海市浦东新区世纪大道'
    },
    {
        status: 2,
        name: '周小伟4',
        age: 26,
        address: '深圳市南山区深南大道'
    }
];
let nums = [{ s: 0, e: 3 }, { s: 2, e: 3 }, { s: 4, e: 8 }];
let i = 0;

class TestController {

    static async index(ctx) { //测试页面
        await ctx.render('index', {
            title: '首页',
            orderList: [{ id: 1, name: 'hehe1' }, { id: 2, name: 'hehe2' }, { id: 3, name: 'hehe3' }],
            copyright: 'Keefe'
        });
    }

    static async testmock(ctx) {
        ctx.Json({ data: list, msg: '查询成功!' })
    }

    static async pages(ctx) {
        console.log(ctx.query)
        let address = ctx.query.address;
        let status = ctx.query.status;
        let name = ctx.query.name;
        let age = ctx.query.age;
        let _list = [];
        list.forEach((v, k) => {
            v.id = ++k;
            v.status_desc = v.status == 1 ? '构建中' : v.status == 2 ? '构建成功' : '构建失败';
        });

        _list = list.filter(item => {
                if (address) {
                    return item.address.match(address);
                } else {
                    return true;
                }
            }).filter(item => {
                if (status) {
                    return item.status == status;
                } else {
                    return true;
                }
            }).filter(item => {
                if (name) {
                    return item.name.match(name);
                } else {
                    return true;
                }
            }).filter(item => {
                if (age) {
                    return item.age == age;
                } else {
                    return true;
                }
            })
            // const bb = 9;
            // bb = 10;
        let json = {
            rows: _list,
            // rows: list.slice(nums[i].s, nums[i].e),
            count: 8
        };
        i >= 2 ? i = 0 : i++;
        ctx.Pages({ page: json, msg: '查询成功!', meta: {} });
    }

    static async delete(ctx) {
        await DELAY(500);
        ctx.Json({ data: 1, msg: '删除成功!' });
    }


    static async testStatus(ctx) {
        const status = ctx.params.status || 400;
        if(status && (status + '').match(/^[1-6]\d{2}$/)) {
            if(status >= 200 && status < 300) {
                ctx.Json({ data: '这里是你需要的数据。', msg: '请求成功', status: status*1 });
            }else {
                ctx.throw(status*1);
            }
        }else {
            ctx.throw(400, '请输入正确的状态码');
        }
    }

    static async getIPGeo(ctx) {
        const ip = ctx.params.ip;
        if(ip.match(/^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){2}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/)){
            const ipInfo = await GeoIp.getModelGeoInfo(ip, true);
            ctx.Json({ data: ipInfo, msg: '处理成功' });
        }else {
            ctx.throw(400, '请输入正确格式的ip');
        }
    }
}


export default TestController;