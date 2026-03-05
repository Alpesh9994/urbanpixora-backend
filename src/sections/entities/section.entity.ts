import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Page } from '../../pages/entities/page.entity';

@Entity('sections')
export class Section {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Page, (page) => page.sections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'page_id' })
    page: Page;

    @Column()
    type: string; // e.g., 'hero', 'services', 'portfolio'

    @Column()
    name: string; // Friendly name for admin panel

    @Column({ default: 0 })
    order: number; // Used for drag and drop ordering

    @Column({ default: true })
    is_active: boolean;

    @Column({ type: 'jsonb', default: {} })
    fields: Record<string, any>;

    @Column({ type: 'jsonb', default: [] })
    items: any[];
}
