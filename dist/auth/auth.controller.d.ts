import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAdminDto: CreateAdminDto): Promise<Omit<import("./entities/admin.entity").Admin, "password">>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        admin: Omit<import("./entities/admin.entity").Admin, "password">;
    }>;
    getProfile(req: any): Promise<Omit<import("./entities/admin.entity").Admin, "password">>;
}
