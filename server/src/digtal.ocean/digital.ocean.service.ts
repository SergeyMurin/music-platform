import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as process from 'process';
import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const download = require('download');

dotenv.config();

export const digitalOceanClient = new S3({
  endpoint: process.env.DIGITAL_OCEAN_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DIGITAL_OCEAN_ACCESS_KEY_ID,
    secretAccessKey: process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY,
  },
});

@Injectable()
export class DigitalOceanService {
  constructor() {}

  async uploadFile(file, title: string, key?: string): Promise<string> {
    try {
      const uploadedFile = await digitalOceanClient
        .putObject(
          {
            Bucket: process.env.DIGITAL_OCEAN_BUCKET,
            ACL: 'public-read',
            Body: file,
            Key: key ? key + title : title,
          },
          () => console.log(`File ${title} was uploaded`),
        )
        .promise();
      return (uploadedFile as any).Location;
    } catch (error) {
      console.error(error);
    }
  }

  async removeFile(title: string, key?: string): Promise<boolean> {
    const response = await digitalOceanClient
      .deleteObject({
        Bucket: process.env.DIGITAL_OCEAN_BUCKET,
        Key: key ? key + title : title,
      })
      .promise();
    return !response.$response.error;
  }

  async downloadFileByURL(url: string) {
    await Promise.all([url].map((url) => download(url, 'downloads')));
  }

  getFileURL(title: string, key?: string) {
    const signedUrl = digitalOceanClient.getSignedUrl('getObject', {
      Bucket: process.env.DIGITAL_OCEAN_BUCKET,
      Key: key ? key + title : title,
    });
    return signedUrl ? signedUrl : null;
  }
}
