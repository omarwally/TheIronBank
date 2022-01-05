import { Controller, Get , Param, Request, UseGuards , Post ,Body, Put} from '@nestjs/common';
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


  @Get("/acc/:userid")
  GetAcc(@Param("userid") userid: string): any {
    return this.accountService.findAccount(userid);
  }


  @Get(":userid")
  GetAccount(@Param("userid") userid: string): any {
    return this.accountService.findAccounts(userid);
  }

  @Post("post")
  public postAccount(@Body()account : AccountDocument){
    return this.accountService.CreateAccount(account)
  }

  @Put("/:accountId")
  updateAccount(
    @Param('accountId') _id:string,
    @Body('balance') balance:number
  ){  
   
    return this.accountService.updateAccount(_id,balance)

  }



}
