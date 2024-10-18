import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignTicketDto {
    @ApiProperty({
        description: 'Enter user id whom to assign the tickets',
        example: 'Arijit',
    })
    @IsString()
    userId: string;
}
