import { IsString, IsOptional, IsBoolean, IsNumber, IsObject, IsArray } from 'class-validator';

export class CreateSectionDto {
    @IsString()
    page_id: string;

    @IsString()
    type: string;

    @IsString()
    name: string;

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
