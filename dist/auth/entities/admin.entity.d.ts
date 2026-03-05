export declare enum AdminRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    EDITOR = "editor"
}
export declare class Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    role: AdminRole;
    is_active: boolean;
    created_at: Date;
}
