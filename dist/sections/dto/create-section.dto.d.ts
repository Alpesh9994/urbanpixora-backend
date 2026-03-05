export declare class CreateSectionDto {
    page_id: string;
    type: string;
    name: string;
    order?: number;
    is_active?: boolean;
    fields?: Record<string, any>;
    items?: any[];
}
