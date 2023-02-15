import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Student } from 'src/schemas/student.schema';
import { CreateUserDto, CreateUserSchema } from '../dtos/createUser.dto';
import { ReqBodyValidator } from '../middlewares/reqBodyValidator.middleware';
import { StudentsService } from '../services/students.service';
import { ConfigService } from '@nestjs/config';
import { RequireRoles, Role } from '../middlewares/roles.guard';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @RequireRoles(Role.Admin, Role.User)
  find(): string {
    return (
      'This action returns all students' +
      this.configService.get<string>('mongoConfigs.url')
    );
  }

  @Post()
  @UsePipes(new ReqBodyValidator(CreateUserSchema))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<Student> {
    const newCreatedUser = await this.studentsService.create(createUserDto);
    return newCreatedUser;
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
