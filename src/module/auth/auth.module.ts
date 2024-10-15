import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { utils } from 'src/common/helper/utils';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            signOptions: {
                algorithm: 'RS256',
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
            privateKey: fs.readFileSync(
                'src/module/auth/certs/private-key.pem',
            ),

            publicKey: fs.readFileSync('src/module/auth/certs/public-key.pem'),
        }),
    ],
    providers: [AuthService, JwtStrategy, utils],
    controllers: [AuthController],
})
export class AuthModule {}
