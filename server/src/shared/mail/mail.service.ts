import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import * as process from 'process';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import * as path from 'path';

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
      html: this.addLinkToMail(
        confirmationLink,
        'confirm-mail.view.html',
        MailLinksSelectors.CONFIRM_EMAIL,
      ),
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
      html: this.addLinkToMail(
        resetLink,
        'reset-password-mail.view.html',
        MailLinksSelectors.RESET_PASSWORD_EMAIL,
      ),
    };

    await this.transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
  }

  private addLinkToMail(link: string, fileName: string, selector: string) {
    const indexPath = path
      .join(__dirname, 'view', fileName)
      .replace('dist\\', '');
    const html = fs.readFileSync(indexPath, 'utf8');
    const dom = new JSDOM(html);

    const a = dom.window.document.querySelector(selector);
    a.setAttribute('href', link);

    return dom.serialize();
  }
}

enum MailLinksSelectors {
  CONFIRM_EMAIL = '.confirm-email-button',
  RESET_PASSWORD_EMAIL = '.reset-password-button',
}
