import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

export const s3 = new S3({
  endpoint: process.env.DIGITAL_OCEAN_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DIGITAL_OCEAN_ACCESS_KEY_ID,
    secretAccessKey: process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY,
  },
});

@Injectable()
export class DigitalOceanService {
  constructor() {
    this.getFileURL(
      process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH,
      'img.jpg',
    );
  }

  async uploadFile(file, key: string, title: string) {
    try {
      if (key) {
        throw new Error('Key param is required');
      }
      s3.putObject(
        {
          Bucket: process.env.DIGITAL_OCEAN_BUCKET,
          ACL: 'private',
          Body: file,
          Key: key + title,
        },
        () => console.log(`File ${title} was uploaded`),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async downloadFile(key: string, title: string) {
    try {
      const file = await s3.getObject({
        Bucket: process.env.DIGITAL_OCEAN_BUCKET,
        Key: key + title,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getFileURL(key: string, title: string): Promise<string | null> {
    let signedUrl;
    await s3.getSignedUrl(
      'getObject',
      {
        Bucket: process.env.DIGITAL_OCEAN_BUCKET,
        Key: key + title,
      },
      function (err, url) {
        if (err) {
          console.error(err);
        } else {
          signedUrl = url;
        }
      },
    );
    return signedUrl ? signedUrl : null;
  }
}
