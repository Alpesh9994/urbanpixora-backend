import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './entities/admin.entity';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AuthService {
    private readonly adminRepository;
    private readonly jwtService;
    constructor(adminRepository: Repository<Admin>, jwtService: JwtService);
    register(createAdminDto: CreateAdminDto): Promise<Omit<Admin, 'password'>>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        admin: Omit<Admin, 'password'>;
    }>;
    getProfile(id: string): Promise<Omit<Admin, 'password'>>;
}
