/*xpioneer*/
import Crypto from 'crypto';
import TOOLS from '../utils/tools';
import Store from '../utils/session/store';
import UserService from '../services/UserService';

const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

const cryptoPwd = (pwd, key) => {
    return Crypto.createHmac('sha256', key).update(pwd).digest('hex');
}

const store = new Store();

class AccountController {

    //POST
    static async login(ctx) {
        const inputs = ctx.request.fields;
        let username = inputs.username;
        let password = inputs.password;
        if ((username && username.length > 0) && (password && password.length > 0)) {
            const result = await UserService.login(username, cryptoPwd(password, username));
            if (result > 0) {
                const user = await UserService.getByName(username);
                await store.checkLogin(user.id);
                ctx.session['CUR_USER'] = user;
                ctx.session['AUTH_TOKEN'] = Crypto.randomBytes(32).toString('hex');
                ctx.Json({ data: user, msg: ctx.session['AUTH_TOKEN'] });
            } else {
                ctx.Json({ data: result, status: 400, msg: '用户名或密码错误！' });
            }
        } else {
            ctx.throw(400, '请输入用户名或密码！');
        }
    }

    //POST
    static async logout(ctx) {
        await store.destroy(ctx.session['CUR_USER'].id);
        delete ctx.session['CUR_USER'];
        delete ctx.session['AUTH_TOKEN'];
        ctx.Json({ data: 1, msg: '退出成功！' });
    }

}

export default AccountController;