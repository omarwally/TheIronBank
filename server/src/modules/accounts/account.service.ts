import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@sp/schemas';
import { Account,AccountDocument } from 'src/schemas/account.schema';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private AccountModel: Model<AccountDocument> ) {}


  async findAll(): Promise<Account[]> {
    return  this.AccountModel.find().exec();
  }

  async findAccount(id:string): Promise<Account> {
    return this.AccountModel.findOne({accId:id}).exec();
    

  }

 
  async findAccounts(id: string): Promise<Account[]> {
    return  this.AccountModel.find({ userid: id }).exec();
  }

  async CreateAccount(acc) {
    const Account = await new this.AccountModel(acc);
    return Account.save();
  }


  
   async updateAccount(id: string, balance:number): Promise<Account> {
    let Account;
   
    try {
      Account = await this.AccountModel.findOne({accId:id}).exec();
      Account.balance=balance;
    } catch (error) {
      throw new NotFoundException('Could not find Account.');

    }
    if (!Account) {
      throw new NotFoundException('Could not find Account.');
    }
    return Account.save();
  }
}



