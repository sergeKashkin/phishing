import { Body, Controller, Get, Post, Sse, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { map, Subject } from 'rxjs';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AppService } from './app.service';
import { SendEmailDto } from './dto/send-mail.dto';

@Controller()
export class AppController {
  private updates$ = new Subject<any>();

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAllAttempts() {
    return this.appService.getAllPhishingAttempts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('send')
  sendPhishingEmail(@Body() sendEmail: SendEmailDto) {
    return this.appService.sendPhishingAttempt(sendEmail.email);
  }

  @Sse('events')
  stream() {
    return this.updates$.asObservable().pipe(
      map((data) => ({ data }))
    );
  }

  @Post('trigger')
  trigger(@Body() update: any) {
    this.updates$.next(update);
    return { status: 'pushed' };
  }
}
