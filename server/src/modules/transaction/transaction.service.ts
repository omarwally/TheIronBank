<<<<<<< Updated upstream
import { Injectable } from '@nestjs/common';
=======
import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction, TransactionDocument } from "@sp/schemas";
import { Model } from "mongoose";
import {Account,AccountSchema } from "@sp/schemas";
>>>>>>> Stashed changes

@Injectable()
export class TransactionService {
  // TODO: Define your Transaction Service Logic
<<<<<<< Updated upstream
}
=======
  constructor(
    @InjectModel(Transaction.name)
    private TransactionModel: Model<TransactionDocument>
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

 

  findAll(): Promise<Transaction[]> {
    return this.TransactionModel.find().exec();
  }
}
>>>>>>> Stashed changes
