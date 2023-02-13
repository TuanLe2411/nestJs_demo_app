import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('students')
export class StudentsController {
  @Get()
  find(): string {
    return 'This action returns all students';
  }

  @Post()
  create(): string {
    return 'Create new student';
  }

  @Put()
  update(): string {
    return 'Update student success';
  }

  @Delete()
  delete(): string {
    return 'Delete student success';
  }
}
