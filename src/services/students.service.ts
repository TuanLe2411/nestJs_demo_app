import {
  InternalServerErrorException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/createUser.dto';
import { Student, StudentDocument } from '../schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Student> {
    try {
      const newUserCreated = await this.studentModel.create(createUserDto);
      return newUserCreated;
    } catch (err) {
      throw new InternalServerErrorException('Fail to create new students', {
        cause: err,
        description: 'Internal server error',
      });
    }
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    return this.studentModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.studentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
