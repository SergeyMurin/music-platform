import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import * as process from 'process';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  private html = fs.readFileSync(process.env.PATH_TO_MAIL_HTML, 'utf8');

  constructor() {
    this.sendEmail('sergeimurin29@gmail.com', 'Confirm Your Email', this.html);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const message = {
      from: `Track Tornado <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
  }
}
