// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Usuario } from './entities/usuario.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([Usuario])],
// })
// export class AuthModule {}
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { Usuario } from './entities/usuario.entity';
// import { AuthController } from './auth.controller';
// import { AuthService } from './services/auth.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([Usuario])],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { Usuario } from './entities/usuario.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from './guards/auth.guard';
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: 'mi_secreto_123',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports:[AuthGuard,JwtModule],
})
export class AuthModule {}