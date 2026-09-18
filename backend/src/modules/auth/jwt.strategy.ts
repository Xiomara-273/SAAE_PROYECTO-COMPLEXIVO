import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SAAE_CLAVE_SECRETA_2026',
    });
  }

  async validate(payload: {
    sub: number;
    correo: string;
    rol: string;
  }) {
    return {
      id_usuario: payload.sub,
      correo: payload.correo,
      rol: payload.rol,
    };
  }
}