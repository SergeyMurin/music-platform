import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Readable } from 'stream';
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
        console.error('[GDrive] Error while getting files:', err);
        return;
      }
      console.log('[GDrive] File list:');
      const files = res.data.files;
      if (files.length) {
        files.forEach((file) => {
          console.log(`${file.name} (${file.id})`);
        });
        return files;
      } else {
        console.log('[GDrive] Files not found');
      }
    });
  }

  async uploadFile(file: any, title: string): Promise<string> {
    try {
      const fileStream = new Readable();
      fileStream.push(file.buffer);
      fileStream.push(null);

      // Создание метаданных файла для загрузки в Google Drive
      const fileMetadata = {
        name: title,
      };

      // Подготовка содержимого файла для загрузки
      const media = {
        mimeType: file.mimetype,
        body: fileStream,
      };

      // Выполнение загрузки файла в Google Drive
      const uploadedFile = await this.driveClient.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });

      const fileId = uploadedFile.data.id; // Полученный ID загруженного файла

      // Установка разрешений для файла (доступ для всех пользователей)
      await this.driveClient.permissions.create({
        fileId: fileId,
        requestBody: {
          type: 'anyone',
          role: 'reader',
        },
      });

      // Получение ссылки для скачивания загруженного файла
      const fileInfo = await this.driveClient.files.get({
        fileId: fileId,
        fields: 'webContentLink',
      });

      return fileInfo.data.webContentLink; // Возвращает ссылку для скачивания файла
    } catch (error) {
      console.error('[GDrive] Error while uploading file', error);
      return null;
    }
  }

  async download(title: string): Promise<ArrayBuffer> {
    const file = await this.getFileByTitle(title);
    if (!file) {
      throw new Error(`File "${title}" not found`);
    }

    const response = await this.driveClient.files.get(
      { fileId: file.id, alt: 'media' },
      { responseType: 'arraybuffer' },
    );

    return response.data; // Возвращаем массив байтов (arraybuffer)
  }

  async removeFile(title: string): Promise<boolean> {
    const file = await this.getFileByTitle(title);
    if (!file) {
      throw new Error(`[GDrive] File "${title}" not found`);
    }

    try {
      await this.driveClient.files.delete({ fileId: file.id });
      return true;
    } catch (error) {
      console.error('[GDrive] Error removing file:', error);
      return false;
    }
  }

  private async getFileByTitle(title: string) {
    const response = await this.driveClient.files.list({
      q: `name='${title}'`,
      spaces: 'drive',
      fields: 'files(id, name)',
    });

    const files = response.data.files;
    return files.length ? files[0] : null;
  }

  async clearDrive() {
    try {
      const response = await this.driveClient.files.list({
        fields: 'files(id)',
      });

      const files = response.data.files;
      for (const file of files) {
        await this.driveClient.files.delete({ fileId: file.id });
      }

      console.log('[GDrive] Google Drive cleared successfully.');
      return true;
    } catch (error) {
      console.error('[GDrive] Error clearing Google Drive:', error);
      return false;
    }
  }
}
