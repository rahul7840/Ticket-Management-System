import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './module/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filter/all.exception.filter';
import { HttpExceptionFilter } from './common/filter/http.exception.filter';
import { ResponseInterceptor } from './common/Interceptor/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { TicketsModule } from './module/tickets/tickets.module';

@Module({
    imports: [PrismaModule, AuthModule, TicketsModule, AppConfigModule],
    controllers: [AppController],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
        { provide: APP_FILTER, useClass: AllExceptionsFilter },
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        { provide: APP_PIPE, useClass: ValidationPipe },
        AppService,
    ],
})
export class AppModule {}
