import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from '../controllers/students.controller';
import { StudentsService } from '../services/students.service';
import { Student, StudentSchema } from '../schemas/student.schema';
import { CustomConfigModule } from './customConfig.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    CustomConfigModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
