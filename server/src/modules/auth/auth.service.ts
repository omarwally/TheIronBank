import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const jwt = require("jsonwebtoken");
import { AuthDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import { User, UserDocument } from "@sp/schemas";
import { Response as Res } from 'express';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}
  /**
   * Determines if the user credentials provided are correct
   * @param dto
   */
  async login(dto: AuthDto, res:Res) {
    this.userService.findByEmail(dto.email)
    .then(async (user)=>{
      if(!user){
        throw new HttpException("not autheroized",401)
      }
      else{
        if(dto.password == user.password){
          var payload: User = await this.userService.findOneUser(dto);
          if (payload != null) {
            const myToken = { email: payload.giuEmail, sub: payload.giuID };
      
            const access_token = this.jwtService.sign(myToken, {
              secret: process.env.JWT_SECRET,
              expiresIn: "1h",
            });
         
            let response: object = { ...payload, token: access_token };
            res.json(response);
            return res;
          }
        
      }
      }
    })
      
    
    
    /* 
      TODO: Add your login logic here to return
      appropriate exceptions when a user/password
      is incorrect. In addition, if a user is found
      and credentials are correct, create a JWT token
      with the entire user object as the payload.
      
      Note: JWT open standard RFC 7519 recommends
      a payload object contain certain "claims".
      As such, it's recommended to create a property
      called "sub" in payload which maps to the user id.
    */
  }
}