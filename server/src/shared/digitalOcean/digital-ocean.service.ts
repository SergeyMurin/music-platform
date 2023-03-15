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
  async uploadFile(file, title: string, key?: string): Promise<string> {
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

    if (uploadedFile.$response.httpResponse.statusCode === 200) {
      return await this.getUploadedFileURL(uploadedFile);
    } else return null;
  }

  async getUploadedFileURL(uploadedFile: any) {
    const protocol =
      uploadedFile.$response.request.httpRequest.endpoint.protocol;
    const host = uploadedFile.$response.request.httpRequest.endpoint.host;
    const path = uploadedFile.$response.request.httpRequest.path;
    return protocol + '//' + host + path;
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

  async download(file_id: string) {
    try {
      const response = await digitalOceanClient
        .getObject({
          Bucket: 'soundtracks',
          Key: `tracks/${file_id}`,
        })
        .promise();

      const fileContent = response.Body as Buffer;
      return fileContent;
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
  }

  getFileURL(title: string, key?: string) {
    const signedUrl = digitalOceanClient.getSignedUrl('getObject', {
      Bucket: process.env.DIGITAL_OCEAN_BUCKET,
      Key: key ? key + title : title,
    });
    return signedUrl ? signedUrl : null;
  }
}
