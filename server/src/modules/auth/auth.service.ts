import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const jwt = require("jsonwebtoken");
import { AuthDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private Users: UserService) {}
  /**
   * Determines if the user credentials provided are correct
   * @param dto
   */
  async login(dto: AuthDto,res: any) {
    this.Users.findByEmail(dto.email)
    .then((user)=>{
      if(!user){
        throw new HttpException("not autheroized",401)
        
      }
      else{
        if(dto.password == user.password){
          const payload = { sub: user.giuEmail ,username: user.name};
          return res.set({ 'x-access-token': this.jwtService.sign(payload) }).json({ hello: 'world' });
        
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
