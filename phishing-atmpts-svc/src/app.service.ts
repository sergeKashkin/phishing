import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {

  async getAllPhishingAttempts(): Promise<any> {
    const response = await axios.get(`${process.env.URL || 'http://localhost:3000'}/phishing/all`);
    return response.data;
  }

  async sendPhishingAttempt(email: string): Promise<any> {
    const response = await axios.post(`${process.env.URL || 'http://localhost:3000'}/phishing/send`, { email });
    return response.data;
  }
}
