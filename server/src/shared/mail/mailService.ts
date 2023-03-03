import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  /**
   * Using gmail service and gmail account to send email from app email to user
   * @type {any}
   * @private
   */
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  /**
   * Generates a message to send and sends it to the specified email
   * @param {string} to - specified email
   * @param {string} subject - email subject
   * @param {string} confirmationLink - link that redirect to client for confirm
   * @returns {Promise<void>}
   * Outputs to the console sending info
   */
  async sendConfirmationEmail(
    to: string,
    subject: string,
    confirmationLink: string,
  ) {
    const message = {
      from: `Track Tornado <${process.env.EMAIL}>`,
      to,
      subject,
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Confirm Email</title>
    <style>
   
      body {
        font-family: Arial, sans-serif;
        background-color: #F5F5F5;
        padding: 40px;
      }

      h1 {
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        color: #333;
        margin-bottom: 20px;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        margin-bottom: 20px;
        text-align: center;
      }

      .confirm-email-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 15px 30px;
        background-color: #333;
        color: #fff;
        text-decoration: none;
        text-align: center;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 18px;
        font-weight: bold;
      }

      .confirm-email-button:hover {
        background-color: #444;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h1>Confirm Email</h1>
    <p>
      You are receiving this email because you recently signed up for an account
      on our website. To confirm your email address, please click the button
      below.
    </p>
    <a href="${confirmationLink}" class="confirm-email-button">
      Confirm Email
    </a>
    <p>
      If you have any questions or concerns, please contact our support team at
      support@your-app.com.
    </p>
  </body>
</html>
`,
    };

    await this.transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
  }

  async sendResetPasswordEmail(to: string, subject: string, resetLink: string) {
    const message = {
      from: `Track Tornado <${process.env.EMAIL}>`,
      to,
      subject,
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Reset Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #F5F5F5;
        padding: 40px;
      }

      h1 {
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        color: #333;
        margin-bottom: 20px;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        margin-bottom: 20px;
        text-align: center;
      }

      .reset-password-button {
        display: block;
        width: 200px;
        margin: 20px auto;
        padding: 15px 30px;
        background-color: #333;
        color: #fff;
        text-decoration: none;
        text-align: center;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 18px;
        font-weight: bold;
      }

      .reset-password-button:hover {
        background-color: #444;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h1>Reset Password</h1>
    <p>
      You are receiving this email because we received a request to reset the
      password for your account. If you did not request a password reset, no
      further action is required.
    </p>
    <a href="${resetLink}" class="reset-password-button">
      Reset Password
    </a>
    <p>
      If you have any questions or concerns, please contact our support team at
      support@your-app.com.
    </p>
  </body>
</html>
`,
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
