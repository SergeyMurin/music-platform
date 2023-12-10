import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import fs from 'fs';

@Injectable()
export class GoogleDriveService {
  private driveClient;

  constructor() {
    this.initializeDriveClient();
    this.getFileList();
  }

  private initializeDriveClient() {
    const keyPath =
      'D:\\Projects\\music-platform\\server\\src\\shared\\googleDrive\\track-tornado-cbce09561c72.json';
    const keyContent = fs.readFileSync(keyPath);

    // @ts-ignore
    const key = JSON.parse(keyContent);
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/drive'],
    );
    this.driveClient = google.drive({ version: 'v3', auth: jwtClient });
  }

  async getFileList() {
    return this.driveClient.files.list({}, (err, res) => {
      if (err) {
        console.error('Ошибка получения списка файлов:', err);
        return;
      }
      const files = res.data.files;
      if (files.length) {
        console.log('Список файлов:');
        files.forEach((file) => {
          console.log(`${file.name} (${file.id})`);
        });
        return files;
      } else {
        console.log('Файлы не найдены.');
      }
    });
  }
}
