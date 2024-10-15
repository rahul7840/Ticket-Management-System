import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Ticket Management System API')
        .setDescription('Here is the API for Ticket Management System ')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3111);
    console.log('server is running 3111...');
}
bootstrap();
