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

  constructor() {}

  async sendConfirmationEmail(
    to: string,
    subject: string,
    confirmationLink: string,
  ) {
    //const html = fs.readFileSync(process.env.PATH_TO_MAIL_HTML, 'utf8');

    const message = {
      from: `Track Tornado <${process.env.EMAIL}>`,
      to,
      subject,
      html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Example Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }
        h1 {
            color: blue;
            text-align: center;
            margin-top: 50px;
        }
        p {
            font-size: 14px;
            line-height: 1.5;
            margin: 20px;
            text-align: justify;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        }
        .btn {
            display: block;
            width: 150px;
            margin: 0 auto;
            padding: 10px;
            background-color: blue;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Hello, World!</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam
        lacus ac dolor luctus, vel egestas libero placerat. Praesent sed
        pharetra libero. Nunc euismod euismod leo eu sollicitudin. Proin
        tincidunt est a dolor feugiat, sit amet tincidunt lacus scelerisque.
    </p>
    <a href="${confirmationLink}" class="btn">Click me!</a>
</div>
</body>
</html>`,
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
