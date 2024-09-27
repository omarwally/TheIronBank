import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction, TransactionDocument } from "@sp/schemas";
import { Model } from "mongoose";
import {Account,AccountSchema } from "@sp/schemas";
import { AccountService } from "../accounts/account.service";

@Injectable()
export class TransactionService {
  // TODO: Define your Transaction Service Logic
  constructor(
    @InjectModel(Transaction.name)
    private TransactionModel: Model<TransactionDocument>,
    private accountService: AccountService
  ) {}

  public async getTransaction(id: string): Promise<any> {
    const trans = await this.TransactionModel.find({transactionId:id  }).exec();
    if (!trans) {
      throw new HttpException("Not Found", 404);
    } else {
      return trans;
    }
  }

  public async postTransaction(newTrans) {
    const transaction = await new this.TransactionModel(newTrans);
    return transaction.save();
  }

  public async recieveTransaction(newTrans) { 
    await this.accountService.findAccount(newTrans.receiverAccountNumber)
    .then( async (account)=>{
      if (!account){
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error:"account not found"
        },HttpStatus.BAD_REQUEST)
      }
      else{
        const transaction = new this.TransactionModel({ 
          creditorId: newTrans.receiverAccountNumber,
          debitorId: "external bank", 
          amount: parseInt(newTrans.amount), 
          date: new Date(Date.now()).toLocaleString(),
          transactionId: newTrans.receiverAccountNumber});
          return transaction.save();
      }
    }).catch(err => {
      console.log(err)
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error:"account not found"
      },HttpStatus.BAD_REQUEST)
    })
    

}

 

  findAll(): Promise<Transaction[]> {
    return this.TransactionModel.find().exec();
  }
}
