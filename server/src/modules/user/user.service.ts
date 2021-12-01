import { Injectable,Request  } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { User, UserDocument } from '@sp/schemas';
import { Model } from 'mongoose';



@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Returns all users from mongo database
   */
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
    
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
}

