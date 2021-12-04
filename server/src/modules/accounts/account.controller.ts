import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { User } from '@sp/schemas';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  findAll(): any {
    return this.accountService.findAll();
  }


  @Get(":userid")
  GetAccount(@Param("userid") userid: string): any {
    return this.accountService.findAccounts(userid);
  }


}
