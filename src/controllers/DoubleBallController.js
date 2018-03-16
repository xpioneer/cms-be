/*xpioneer*/

import TOOLS from '../utils/tools';
import DoubleBallService from '../services/DoubleBallService';

const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

function createAward() {
  const award = {};
  let balls = new Array(33),
      blues = new Array(16);

  for(let i = 0; i < balls.length; i++) {
    let val = i + 1;
    balls[i] = val;
    if(i < 16) {
      blues[i] = val;
    }
  }

  let result = [];
  for(let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * balls.length);
    let ball = balls.splice(index, 1);
    result = [...result, ...ball];
  }

  // red
  award['red_balls'] = result.toString();

  let blueBall = blues[Math.floor(Math.random() * blues.length)];
  result.push(blueBall);

  //blue
  award['blue_ball'] = blueBall;

  // gen_result
  award['gen_result'] = result.toString();
  // award
  award['award'] = [...award['red_balls'].split(',').sort((a, b) => a - b), blueBall].toString();

  return award;
}

class DoubleBallController {

  static async getById(ctx) {
    // console.log(ctx.params, ctx.query)
    let id = ctx.params.id;
    let award = await DoubleBallService.getById(id);
    if (award)
      ctx.Json({ data: award });
    else
      ctx.throw(404);
  }

  //GET
  static async pages(ctx) {
    let conditions = ctx.getParams;
    let pages = await DoubleBallService.pages(conditions);
    pages.rows.map(m => {
      m.created_at = DateTimeF(m.created_at);
      return m;
    });
    ctx.Pages({ page: pages });
  }

  //POST
  static async insert(ctx) {
    const result = await DoubleBallService.insert({
      ...createAward(),
      created_by: ctx.session['CUR_USER'].id,
      updated_by: ctx.session['CUR_USER'].id,
    });
    console.log(result);
    ctx.Json({ data: result.id, msg: '添加成功！' });
  }


  //DELETE
  static async delete(ctx) {
    ctx.throw(500);
    const id = ctx.params.id;
    if (id) {
      const result = await DoubleBallService.delete(id, ctx);
      ctx.Json({ data: result[0], msg: '删除成功!' });
    } else {
      ctx.throw(400);
    }
  }

  // random
  static async random(ctx) {
    const award = ctx.query.award;
    console.log(ctx.query)
    if (award) {
      let randomBall = createAward();
      let timer = Date.now();
      console.log(new Date())
      while(award != randomBall.gen_result) {
        const result = await DoubleBallService.insert({
          ...randomBall,
          created_by: ctx.session['CUR_USER'].id,
          updated_by: ctx.session['CUR_USER'].id
        });
        randomBall = createAward();
      }
      timer = Date.now() - timer;
      ctx.Json({ data: timer, msg: '添加成功！' });
    } else {
      ctx.throw(400);
    }
  }

}

export default DoubleBallController;
