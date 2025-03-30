import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import axios from 'axios';
import { ApiBody } from '@nestjs/swagger';

import { PhishingService } from './phishing.service';
import { SendPhishingDto } from './dto/send-email.dto';

@Controller('phishing')
export class PhishingController {

  constructor(private readonly phishingService: PhishingService) {}

  @Get('click/:id')
  async handlePhishingClick(@Param('id') id: string): Promise<any> {
    const updated = await this.phishingService.handlePhishingClick(id);
    // post to second service
    try {
      await axios.post(`${ process.env.URL || 'http://localhost:3001'}/trigger`, updated);
    } catch (error) {
      console.error('❌ Failed to notify SSE service:', error.message);
    }
    return 'Thank you for signing up!';
  }

  @Get('all')
  getAllPhishingAttempts(): any {
    return this.phishingService.getAllPhishingAttempts();
  }

  @Post('send')
  @ApiBody({ type: SendPhishingDto })
  async sendPhishingEmail(@Body() email: SendPhishingDto): Promise<any> {
    return this.phishingService.sendPhishingEmail(email.email);
  }
}
