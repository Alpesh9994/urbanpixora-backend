import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private readonly jwtService: JwtService,
    ) { }

    async register(createAdminDto: CreateAdminDto): Promise<Omit<Admin, 'password'>> {
        const existing = await this.adminRepository.findOne({ where: { email: createAdminDto.email } });
        if (existing) {
            throw new ConflictException('Admin with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
        const admin = this.adminRepository.create({ ...createAdminDto, password: hashedPassword });
        const saved = await this.adminRepository.save(admin);
        const { password, ...result } = saved;
        return result;
    }

    async login(loginDto: LoginDto): Promise<{ access_token: string; admin: Omit<Admin, 'password'> }> {
        const admin = await this.adminRepository.findOne({ where: { email: loginDto.email } });
        if (!admin || !admin.is_active) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(loginDto.password, admin.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: admin.id, email: admin.email, role: admin.role };
        const { password, ...adminData } = admin;
        return {
            access_token: this.jwtService.sign(payload),
            admin: adminData,
        };
    }

    async getProfile(id: string): Promise<Omit<Admin, 'password'>> {
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin) throw new UnauthorizedException();
        const { password, ...result } = admin;
        return result;
    }
}
