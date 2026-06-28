import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('usuarios')
export class UsuariosController {
  @Get('perfil')
  @UseGuards(AuthGuard)
  perfil(@Req() req: any) {
    return {
      mensaje: 'Acceso autorizado',
      usuario: req.usuario,
    };
  }
}
