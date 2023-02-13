import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../configs/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./environments/.${
        process.env.NODE_ENV || 'development'
      }.env`,
      load: [config],
    }),
  ],
  exports: [ConfigModule],
})
export class CustomConfigModule {}
