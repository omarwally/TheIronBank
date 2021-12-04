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
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { UserDocument } from "@sp/schemas";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * API endpoint handler returns the authenticated user from JWT payload
  //  */
  // @UseGuards(AuthGuard("jwt"))
  @Post("postt")
  public postUser(@Body() user: UserDocument) {
    return this.userService.postUser(user);
  }
  @Get()
  user(@Request() req: any): any {
    return req.user;
  }

  /**
   * API endpoint handler returns all users from mongo database
   */
  //@UseGuards(AuthGuard("jwt"))
  @Get("list")
  users(): any {
    return this.userService.findAll();
  }
}
