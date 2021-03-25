import { Injectable , NotFoundException  } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './url.model';
import { generate } from 'short-uuid';

@Injectable()
export class UrlService {
    constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {}

    async getUrl(): Promise<Url[]> {
        const data =  this.urlModel.find().exec();
        console.log(data);
        return data;
    }

    async getUrlByHashcode(urlHash: string): Promise<Url> {
        const urlData = await this.urlModel.findOne({urlHash}).exec();
        if(!urlData) {
            throw new NotFoundException('data not found') 
        }
        return urlData;
    }

    async createShortUrl(url: string): Promise<Url> {
        const urlHash = generate();
        const shortUrl = `http://localhost:3000/home/${urlHash}`;
        const urlExists = await this.urlModel.findOne({url}).exec();
        if(urlExists){
            return urlExists;
        }
        const shortUrlObj = new this.urlModel({url , shortUrl , urlHash});
        const saveData = await shortUrlObj.save();
        return saveData;
    }

    async updateShortUrl(urlHash: string , url: string): Promise<Url> {
        const newUrlHash = generate();
        const shortUrl = `http://localhost:3000/home/${newUrlHash}`;
        const urlExists = await this.urlModel.findOne({urlHash}).exec();
        if(!urlExists) {
            throw new NotFoundException('data not found') 
        }
        urlExists.url = url;
        urlExists.shortUrl= shortUrl;
        urlExists.urlHash= newUrlHash;
        const updateData = await urlExists.save();
        return updateData;

    }

    async delete(urlHash: string): Promise<any> {
        return this.urlModel.deleteOne({urlHash}).exec();
    }

    async deleteAll(): Promise<any> {
        return this.urlModel.deleteMany({}).exec();
    }

    async swapUrl(urlHash: string , urlHash2: string): Promise<string> {
        const urlExists = await this.findOne(urlHash);
        if(!urlExists) {
            throw new NotFoundException('data not found') 
        }
        const urlExists2 = await this.findOne(urlHash2);
        if(!urlExists2) {
            throw new NotFoundException('data not found') 
        }
        const temp = urlExists.url;
        urlExists.url = urlExists2.url;
        urlExists2.url = temp;
        await urlExists.save();
        await urlExists2.save();
        return "success";
    }

    private async findOne(urlHash: string): Promise<Url | any>{
        const urlData = await this.urlModel.findOne({urlHash}).exec()
        return urlData;
    } 
}
