import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('home/:urlHash')
  async redirect(@Res() res , @Param('urlHash')urlHash: string) {
    const data = await this.appService.getUrlData(urlHash);
     return res.redirect(data.url);
  }
}
