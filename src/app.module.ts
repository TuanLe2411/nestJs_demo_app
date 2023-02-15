import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './modules/customConfig.module';
import { StudentsModule } from './modules/students.module';
import { RolesModule } from './modules/roles.module';

@Module({
  imports: [
    CustomConfigModule,
    MongooseModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoConfigs.url'),
      }),
      inject: [ConfigService],
    }),
    StudentsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
