import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlSchema } from './url/url/url.model';
import { UrlModule } from './url/url/url.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://localhost:27017/short-url`), MongooseModule.forFeature([{ name: 'Url' , schema: UrlSchema}]), UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
