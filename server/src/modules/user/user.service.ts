import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@sp/schemas';
import { Model } from 'mongoose';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '../auth/dtos/auth.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

   FindUser(name: string): Promise<User> {
    return this.userModel.findOne({name}).exec();
    
  }
  async findOneUser(dto:AuthDto):Promise<User>{
     
    // const yallaUser=this.userModel.find({ email: dto.email,password:dto.password}).exec();
    
     return await this.userModel.findOne({ email: dto.email,password:dto.password}).exec();
    
  }

  async findByEmail(email: string): Promise<any>{
    //console.log(email)
    let user = this.userModel.findOne({giuEmail: email})
    
    if(!user){
      throw new HttpException("not autheroized",401)
    }
    else{
      return(user)
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async postUser(newUser) {
    const user = await new this.userModel(newUser);
    return user.save();
  }
}
