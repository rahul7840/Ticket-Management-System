import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create.tickets.dto';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ApiError } from 'src/common/helper/error_description';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/helper/enum';
import { AssignTicketDto } from './dto/assign.tickets.dto';

@Controller('tickets')
@ApiTags('Tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'Get all Tickets',
        description: 'Get all Tickets',
    })
    async findAll() {
        return await this.ticketsService.getAllTickets();
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'Create the tickets by ADMIN',
        description: 'Create the tickets',
    })
    async create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
        const userID = req.user.id;
        return this.ticketsService.createTicket(createTicketDto, userID);
    }

    @Post(':ticketId/assign')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'Assign the tickets by ADMIN to CUSTOMERS',
        description: 'Assign the tickets',
    })
    async assignUser(
        @Request() req,
        @Param('ticketId') ticketId: string,
        @Body() dto: AssignTicketDto,
    ) {
        const adminID = req.user.id;
        return this.ticketsService.assignUserToTicket(ticketId, dto, adminID);
    }
}
