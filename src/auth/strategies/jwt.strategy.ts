import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'urbanpixora_secret',
        });
    }

    async validate(payload: { sub: string; email: string; role: string }) {
        const admin = await this.adminRepository.findOne({ where: { id: payload.sub } });
        if (!admin || !admin.is_active) {
            throw new UnauthorizedException('Access denied');
        }
        return { id: admin.id, email: admin.email, role: admin.role };
    }
}
