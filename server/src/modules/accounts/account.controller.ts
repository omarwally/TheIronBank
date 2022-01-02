import { Controller, Get, Param, Request, UseGuards , Post ,Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { User } from '@sp/schemas';
import { AccountDocument } from 'src/schemas/account.schema';


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

  @Post("post")
  public postAccount(@Body()account : AccountDocument){
    return this.accountService.CreateAccount(account)
  }

}
