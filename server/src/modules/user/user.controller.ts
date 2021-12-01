import { Controller, Get, Request,Post, UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

 
 

  /**
   * API endpoint handler returns the authenticated user from JWT payload
   */    
  //@UseGuards(AuthGuard('jwt'))
  @Get()
  user(@Request() req: any): any {
    return req.user;
  }

  /**
   * API endpoint handler returns all users from mongo database
   */
  //@UseGuards(AuthGuard('jwt'))
  @Get('list')
  users(): any {
    return this.userService.findAll();
  }
   //@UseGuards(AuthGuard('jwt'))
   @Get(':email')
   find(@Param("email") email: string): any {
     return this.userService.findByEmail(email);
     
   }
}