import { IsString, IsOptional, IsBoolean, IsNumber, IsObject, IsArray } from 'class-validator';

export class UpdateSectionDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    order?: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsObject()
    fields?: Record<string, any>;

    @IsOptional()
    @IsArray()
    items?: any[];
}
