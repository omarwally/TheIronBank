import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionController } from "./transactions.controller";
import { Transaction, TransactionSchema } from "@sp/schemas";
import { TransactionService } from "./transaction.service";
import { AccountService } from '../accounts/account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService,AccountService],
})
export class TransactionModule {}