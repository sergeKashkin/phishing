import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendPhishingDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The target email address for the phishing test',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}