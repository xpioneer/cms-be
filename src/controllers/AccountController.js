/*qinfeng*/

import TOOLS from '../utils/tools';
import UserService from '../services/UserService';

const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

class AccountController {

    //POST
    static async login (ctx) {
        const inputs = ctx.request.fields;
        let model = {
            username: inputs.username,
            password: inputs.password
        }
        const result = await UserService.insert(model);
        ctx.Json({data: result, msg: '添加成功！'});
    }

}

export default AccountController;