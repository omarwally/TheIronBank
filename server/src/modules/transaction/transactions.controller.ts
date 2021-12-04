//import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { TransactionDocument } from "@sp/schemas";
import { TransactionService } from "./transaction.service";

@Controller("transactions")
export class TransactionController {
  constructor(private transactionService: TransactionService) {} // TODO: Define your Transaction Endpoints

  @Post("post")
  public postTransaction(@Body() trans: TransactionDocument) {
    return this.transactionService.postTransaction(trans);
  }

  @Get("list")
  users(): any {
    return this.transactionService.findAll();
  }
  @Get(":id")
  find(@Param("id") id: number): any {
    return this.transactionService.getTransaction(id);
  }
}
