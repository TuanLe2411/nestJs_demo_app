import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './configs/configurations';
import { StudentsModule } from './modules/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./environments/.${
        process.env.NODE_ENV || 'development'
      }.env`,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoConfigs.url'),
      }),
      inject: [ConfigService],
    }),
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
