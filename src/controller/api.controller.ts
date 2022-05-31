import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  Files,
  Fields,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/upload')
  async upload(
    @Files() files: { data: string; fileName: string },
    @Fields() fields: { test: string }
  ) {
    return { files, fields };
  }
}
