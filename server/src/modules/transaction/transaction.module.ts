<<<<<<< Updated upstream
import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transaction.service';

@Module({
=======
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionController } from "./transactions.controller";
import { Transaction, TransactionSchema } from "@sp/schemas";
import { TransactionService } from "./transaction.service";
import {Account,AccountSchema } from "@sp/schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Account.name, schema: AccountSchema}
    ]),
  ],
>>>>>>> Stashed changes
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}