import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@sp/schemas';
import { Account,AccountDocument } from 'src/schemas/account.schema';
import { Model } from 'mongoose';
import { HttpException, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private AccountModel: Model<AccountDocument> ) {}


  async findAll(): Promise<Account[]> {
    return  this.AccountModel.find().exec();
  }

 
  async findAccounts(id: string): Promise<Account[]> {
    return  this.AccountModel.find({ userid: id }).exec();
  }


}
