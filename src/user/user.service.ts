import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { Model } from 'mongoose'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<IUser>) {}
  
  async findAll(): Promise<IUser[]> {
    return await this.userModel.find()
  }

  async findOne(id): Promise<IUser> {
    return await this.userModel.findById({ _id: id })
  }

  async create(createUserDto: UserDto): Promise<IUser> {
    const createdUser = await new this.userModel(createUserDto)
    return createdUser.save()
  }
  
  async update(id, updateUserDto: UserDto): Promise<IUser> {
    return await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, { new: true }).exec()
  }

  async delete(id): Promise<IUser> {
    return await this.userModel.findOneAndDelete({ _id: id }).exec()
  }

}
