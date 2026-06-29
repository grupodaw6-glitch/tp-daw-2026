import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../entities/usuario.entity';
import { LoginDto } from '../dtos/input/login.dto';
export declare class AuthService {
    private readonly usuariosRepository;
    private readonly jwtService;
    constructor(usuariosRepository: Repository<Usuario>, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: any;
    }>;
}
