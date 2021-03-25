import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Url } from './url/url/url.model';


@Injectable()
export class AppService {
  constructor(@InjectModel('Url') private readonly urlModel: Model<Url>){}
  getHello(): string {
    return 'Hello World!';
  }

  async getUrlData(urlHash: string): Promise<Url> {
    return this.urlModel.findOne({urlHash}).exec()
  }
}
