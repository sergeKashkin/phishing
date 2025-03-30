import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PhishingAttempt extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ default: 'pending' })
  status: string;
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);
