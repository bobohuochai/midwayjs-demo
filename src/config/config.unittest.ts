import { MidwayConfig } from '@midwayjs/core';

export default {
  koa: {
    port: null,
  },
  socketIO: {
    port: 3000,
    path: '/socketio',
  },
} as MidwayConfig;
