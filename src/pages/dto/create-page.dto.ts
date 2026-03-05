import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePageDto {
    @IsString()
    slug: string;

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    meta_title?: string;

    @IsOptional()
    @IsString()
    meta_description?: string;

    @IsOptional()
    @IsBoolean()
    is_published?: boolean;
}
