import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Type {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
}

export class SignupDto {
    @ApiProperty({
        description: 'Enter the fullName of the user',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    Name: string;

    @ApiProperty({
        description: 'enter the email of the user',
        example: 'john@example.com',
        required: true,
    })
    @IsEmail()
    Email: string;

    @ApiProperty({
        description: 'Enter the Password',
        example: 'secure',
    })
    @IsNotEmpty()
    @IsString()
    Password: string;

    @ApiProperty({
        description: 'Enter the type of the user',
        example: 'admin',
        required: true,
        enum: Type,
    })
    @IsNotEmpty()
    @IsEnum(Type, { message: 'Type must be one of: customer, admin' })
    Type: Type;
}
