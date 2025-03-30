import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as nodemailer from 'nodemailer';
import { PhishingAttempt } from './models/phishing-attempt.model';
import { Model } from 'mongoose';

@Injectable()
export class PhishingService {

  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingModel: Model<PhishingAttempt>
  ) {}

  async sendPhishingEmail(email: string): Promise<any> {
    const attempt = await this.phishingModel.create({ email });

    const phishingLink = `http://localhost:3000/phishing/click/${attempt._id}`;

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'acc88ae782724d',
        pass: '1207cc7f8b192e',
      },
    });

    const mailOptions = {
      from: 'security@example.com',
      to: email,
      subject: 'Important: Action Required',
      html: `
        <p>Hello,</p>
        <p>Please click the link below to update your information:</p>
        <a href="${phishingLink}">Update Now</a>
        <p>Thank you.</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return attempt;
    } catch (e) {
      await this.phishingModel.findByIdAndDelete(attempt._id);
      throw new Error('Failed to send phishing email');
    }
  }

  async handlePhishingClick(id: string): Promise<any> {
    return this.phishingModel.findByIdAndUpdate(
      id,
      { status: 'clicked' },
      { new: true }
    );
  }

  async getAllPhishingAttempts(): Promise<any> {
    return await this.phishingModel.find().sort({ createdAt: -1 }).exec();
  }
}
