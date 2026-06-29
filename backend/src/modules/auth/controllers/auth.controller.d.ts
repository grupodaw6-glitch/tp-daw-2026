import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/input/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: any;
    }>;
}
