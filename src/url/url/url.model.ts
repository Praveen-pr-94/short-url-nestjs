import * as mongoose from 'mongoose';

export const UrlSchema = new mongoose.Schema({
    url: String,
    urlHash: String,
    shortUrl: String,
} , {versionKey: false});

export interface Url extends mongoose.Document {
    id: string,
    url: string,
    urlHash: String,
    shortUrl: string
}