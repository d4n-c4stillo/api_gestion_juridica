

import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

import { AuthTokensDTO } from './dtos/auth-tokens.dto';
import { ChangeEmailPasswordDTO } from './dtos/change-email.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { IAuthUser } from './types/auth-user';
import { AuthEmailService } from './auth-email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authEmailService: AuthEmailService,
  ) {}

  

  async login(dto: any) {

    //TOOD: completar

    if(dto.password != '123456'){
      return ({
        "statusCode": 404,
        "message": [
          "Credenciales no coinciden !!"
        ],
        "data": 0,
        "error": "Credenciales no coinciden !!"
      });
    }

    let usuario = {user: '', rol:0, token: '', userId: 0, email: ''};

    switch (dto.username) {
      case 'admin@gmail.com':  usuario.user = 'Usuario Admin'; usuario.rol = 0; usuario.userId = 1; usuario.email= dto.username; break;
      
      case 'basico@gmail.com':  usuario.user = 'Usuario Regular'; usuario.rol = 1; usuario.userId = 2; usuario.email= dto.username;  break;
      
      case 'vip@gmail.com':  usuario.user = 'Usuario VIP'; usuario.rol = 2; usuario.userId = 3; usuario.email= dto.username;  break;
      
      case 'gold@gmail.com':  usuario.user = 'usuario GOLD'; usuario.rol = 3; usuario.userId = 4; usuario.email= dto.username;  break;

      case 'abogado@gmail.com':  usuario.user = 'usuario ABOGADO'; usuario.rol = 4; usuario.userId = 5; usuario.email= dto.username;  break;
    }

    return ({
      "statusCode": 200,
      "message": [
        "Acceso Permitido"
      ],
      "data": usuario,
      "error": ""
    });
    

  }
}
