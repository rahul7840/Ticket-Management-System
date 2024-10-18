import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum TicketType {
    CONCERT = 'concert',
    CONFERENCE = 'conference',
    SPORTS = 'sports',
}

export enum TicketStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    CLOSED = 'closed',
}

export enum TicketPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export class CreateTicketDto {
    @ApiProperty({
        description: 'Enter the title',
        example: 'Arijit',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Enter the description',
        example: 'description',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Enter the TicketType of the tickets',
        example: 'concert',
        required: true,
        enum: TicketType,
    })
    @IsEnum(TicketType, {
        message: 'TicketType must be one of: concert, sports, conference',
    })
    type: TicketType;

    @ApiProperty({
        description: 'Enter the venue',
        example: 'Ahmadabad',
    })
    @IsString()
    venue: string;

    @ApiProperty({
        description: 'Enter the status of the user',
        example: 'open',
        required: true,
        enum: TicketStatus,
    })
    @IsEnum(TicketStatus, {
        message: 'status must be one of: open, in_progress, close',
    })
    status!: TicketStatus;

    @ApiProperty({
        description: 'Enter the tickets price',
        example: '399',
    })
    price?: number;

    @ApiProperty({
        description: 'Enter the priority of the tickets',
        example: 'low',
        required: true,
        enum: TicketPriority,
    })
    @IsEnum(TicketPriority, {
        message: 'priority must be one of: high, low, medium',
    })
    priority: TicketPriority;

    @ApiProperty({
        description: 'Enter the birth date of the user',
        example: '2025-01-01',
        required: true,
    })
    dueDate: Date;
}
