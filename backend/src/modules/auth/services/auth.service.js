"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const usuario_entity_1 = require("../entities/usuario.entity");
const estados_usuarios_enum_1 = require("../enums/estados-usuarios.enum");
let AuthService = class AuthService {
    usuariosRepository;
    jwtService;
    constructor(usuariosRepository, jwtService) {
        this.usuariosRepository = usuariosRepository;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const usuario = await this.usuariosRepository.findOne({
            where: {
                nombre: loginDto.nombre,
            },
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuario incorrecto');
        }
        if (usuario.clave !== loginDto.clave) {
            throw new common_1.UnauthorizedException('Clave incorrecta');
        }
        if (usuario.estado !== estados_usuarios_enum_1.EstadosUsuariosEnum.ACTIVO) {
            throw new common_1.UnauthorizedException('Usuario dado de baja');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map