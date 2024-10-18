import {
    Injectable,
    ForbiddenException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create.tickets.dto';
import { Ticket } from '@prisma/client';
import { AssignTicketDto } from './dto/assign.tickets.dto';

@Injectable()
export class TicketsService {
    constructor(private readonly prisma: PrismaService) {}

    async createTicket(dto: CreateTicketDto, userID: string): Promise<Ticket> {
        if (!userID) throw new BadRequestException('must login');
        console.log('userID-controller->', userID);

        const changeDate = new Date(`${dto.dueDate}T00:00:00Z`);

        if (changeDate <= new Date()) {
            throw new ForbiddenException('Due date must be in the future.');
        }

        return await this.prisma.ticket.create({
            data: {
                title: dto.title,
                description: dto.description,
                tickeType: dto.type,
                venue: dto.venue,
                status: dto.status,
                price: dto.price,
                priority: dto.priority,
                dueDate: changeDate,
                createdBy: userID,
            },
        });
    }
    async getAllTickets() {
        return await this.prisma.ticket.findMany();
    }
    async assignUserToTicket(
        ticketId: string,
        dto: AssignTicketDto,
        adminID: string,
    ) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
            include: { assignedUsers: true },
        });
        if (!ticket) {
            throw new NotFoundException('Ticket not found.');
        }
        if (ticket.status === 'closed') {
            throw new ForbiddenException(
                'Cannot assign users to a closed ticket.',
            );
        }
        const isAdmin = await this.prisma.user.findUnique({
            where: { id: adminID },
            select: { type: true },
        });
        if (ticket.createdBy !== adminID && isAdmin.type !== 'admin') {
            throw new ForbiddenException(
                'Only the creator or admin can assign users to the ticket.',
            );
        }
        const userAlreadyAssigned = ticket.assignedUsers.some(
            (user) => user.id === dto.userId,
        );
        if (userAlreadyAssigned) {
            throw new ForbiddenException(
                'User already assigned to this ticket.',
            );
        }
        if (ticket.assignedUsers.length >= 5) {
            throw new ForbiddenException(
                'Cannot assign more than 5 users to a ticket.',
            );
        }
        return await this.prisma.ticket.update({
            where: { id: ticketId },
            data: {
                assignedUsers: {
                    connect: { id: dto.userId },
                },
            },
        });
    }
}
