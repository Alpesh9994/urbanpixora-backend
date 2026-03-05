import { Page } from '../../pages/entities/page.entity';
export declare class Section {
    id: string;
    page: Page;
    type: string;
    name: string;
    order: number;
    is_active: boolean;
    fields: Record<string, any>;
    items: any[];
}
