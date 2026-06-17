import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Usuario } from '../entities/usuario.entity';
import { LoginDto } from '../dtos/input/login.dto';
import { EstadosUsuariosEnum } from '../enums/estados-usuarios.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario = await this.usuariosRepository.findOne({
      where: {
        nombre: loginDto.nombre,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario incorrecto');
    }

    if (usuario.clave !== loginDto.clave) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    if (usuario.estado !== EstadosUsuariosEnum.ACTIVO) {
      throw new UnauthorizedException('Usuario dado de baja');
    }

    const payload = {
      sub: usuario.id,
      nombre: usuario.nombre,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
