import { createApp, close } from '@midwayjs/mock'
import { Framework,Application } from '@midwayjs/koa';
import { createSocketIOClient,SocketIOWrapperClient } from '@midwayjs/mock';

describe('/test/index.test.ts', () => {

    let app: Application;

    let client: SocketIOWrapperClient & NodeJS.EventEmitter

    beforeAll(async () => {
      // 只创建一次 app，可以复用
      try {
        // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
        // refs: https://github.com/facebook/jest/issues/8688
        app = await createApp<Framework>();

        client = await createSocketIOClient({
            port: 3000,
            namespace:'/socketio'
        });
      } catch(err) {
          console.error('test beforeAll error', err);
        throw err;
      }
    });
  
    afterAll(async () => {
      // 关闭客户端
      await client.close();
      // close app
      await close(app);
    });

    it('should test create socket app', async () => {
    // 拿到结果返回
    const data = await new Promise(resolve => {
      client.on('myEventResult', resolve);
      // 发送事件
      client.send('myEvent', 1, 2, 3);
    });

    // 判断结果
    expect(data).toEqual({
      name: 'harry',
      result: 6,
    });

  });

});