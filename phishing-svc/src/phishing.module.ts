import { Module } from '@nestjs/common';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingAttempt, PhishingAttemptSchema } from './models/phishing-attempt.model';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://user:password@mycluster.77lmxqd.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster'
    ),
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}
