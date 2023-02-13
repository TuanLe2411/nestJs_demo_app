import * as Joi from 'joi';

export const CreateUserSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
});

export interface CreateUserDto {
  readonly name: string;
  readonly age: number;
}
