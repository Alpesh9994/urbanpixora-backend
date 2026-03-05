import { Section } from 'src/sections/entities/section.entity';
export declare class Page {
    id: string;
    slug: string;
    title: string;
    meta_title: string;
    meta_description: string;
    is_published: boolean;
    sections: Section[];
    created_at: Date;
    updated_at: Date;
}
