import { Body, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UrlService } from './url.service';
import {Url} from './url.model';

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Get()
    async getAll(): Promise<Url[]> {
      return this.urlService.getUrl();
    }

    @Get(':urlHash')
    async getByUrlHashCode( @Param('urlHash')urlHash: string): Promise<Url> {
      return this.urlService.getUrlByHashcode(urlHash);
    }

    @Post()
    async createShortUrl( @Body('url')url: string): Promise<Url> {
      return this.urlService.createShortUrl(url);
    }

    @Patch(':urlHash')
    async updateShortUrl( @Param('urlHash')urlHash: string ,@Body('url')url: string): Promise<Url> {
      return this.urlService.updateShortUrl(urlHash , url);
    }

    @Delete(':urlHash')
    async delete( @Param('urlHash')urlHash: string): Promise<Url> {
      return this.urlService.delete(urlHash);
    }

    @Put(':urlHash/:urlHash2')
    async swapUrl( @Param('urlHash')urlHash1: string , @Param('urlHash2')urlHash2: string): Promise<string> {
      return this.urlService.swapUrl(urlHash1 , urlHash2);
    }

    @Delete('all')
    async deleteAll(): Promise<Url> {
      return this.urlService.deleteAll();
    }

}
