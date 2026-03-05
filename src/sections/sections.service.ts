import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { Page } from '../pages/entities/page.entity';

@Injectable()
export class SectionsService {
    constructor(
        @InjectRepository(Section)
        private readonly sectionRepository: Repository<Section>,
        @InjectRepository(Page)
        private readonly pageRepository: Repository<Page>,
    ) { }

    async create(createSectionDto: CreateSectionDto): Promise<Section> {
        const page = await this.pageRepository.findOne({ where: { id: createSectionDto.page_id } });
        if (!page) {
            throw new NotFoundException(`Page with ID ${createSectionDto.page_id} not found`);
        }

        const section = this.sectionRepository.create({
            ...createSectionDto,
            page,
        });
        return await this.sectionRepository.save(section);
    }

    async findAllByPage(pageId: string): Promise<Section[]> {
        return await this.sectionRepository.find({
            where: { page: { id: pageId } },
            order: { order: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Section> {
        const section = await this.sectionRepository.findOne({ where: { id } });
        if (!section) {
            throw new NotFoundException(`Section #${id} not found`);
        }
        return section;
    }

    async update(id: string, updateSectionDto: UpdateSectionDto): Promise<Section> {
        const section = await this.findOne(id);
        const updatedSection = this.sectionRepository.merge(section, updateSectionDto);
        return await this.sectionRepository.save(updatedSection);
    }

    async reorder(sections: { id: string; order: number }[]): Promise<void> {
        // Basic bulk update for drag and drop
        const updates = sections.map((s) =>
            this.sectionRepository.update(s.id, { order: s.order }),
        );
        await Promise.all(updates);
    }

    async remove(id: string): Promise<void> {
        const section = await this.findOne(id);
        await this.sectionRepository.remove(section);
    }
}
