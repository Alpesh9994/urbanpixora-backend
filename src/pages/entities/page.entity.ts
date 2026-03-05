import { Section } from 'src/sections/entities/section.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('pages')
export class Page {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    slug: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    meta_title: string;

    @Column({ nullable: true })
    meta_description: string;

    @Column({ default: false })
    is_published: boolean;

    @OneToMany(() => Section, (section) => section.page, { cascade: true })
    sections: Section[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
