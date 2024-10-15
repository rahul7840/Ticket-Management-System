import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './module/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { AppConfigModule } from './config/config.module';

@Module({
    imports: [PrismaModule, AuthModule, AppConfigModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
