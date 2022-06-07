import { WSController, Inject, OnWSMessage, WSEmit } from '@midwayjs/decorator';
import { Context } from '@midwayjs/socketio';

@WSController('/')
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @OnWSMessage('myEvent')
  @WSEmit('myEventResult')
  async gotMessage(data1, data2, data3) {
    return {
      name: 'harry',
      result: data1 + data2 + data3,
    };
  }
}
