import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
    constructor(
        @InjectRepository(Page)
        private readonly pageRepository: Repository<Page>,
    ) { }

    async create(createPageDto: CreatePageDto): Promise<Page> {
        const page = this.pageRepository.create(createPageDto);
        return await this.pageRepository.save(page);
    }

    async findAll(): Promise<Page[]> {
        return await this.pageRepository.find({
            relations: ['sections'],
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Page> {
        const page = await this.pageRepository.findOne({
            where: { id },
            relations: ['sections'], // Include associated sections
        });
        if (!page) {
            throw new NotFoundException(`Page #${id} not found`);
        }
        return page;
    }

    async findBySlug(slug: string): Promise<Page> {
        const page = await this.pageRepository.findOne({
            where: { slug },
            relations: ['sections'],
        });

        if (!page) {
            throw new NotFoundException(`Page with slug ${slug} not found`);
        }

        // Sort sections by order
        if (page.sections && page.sections.length > 0) {
            page.sections.sort((a, b) => a.order - b.order);
        }
        return page;
    }

    async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
        const page = await this.findOne(id);
        const updatedPage = this.pageRepository.merge(page, updatePageDto);
        return await this.pageRepository.save(updatedPage);
    }

    async remove(id: string): Promise<void> {
        const page = await this.findOne(id);
        await this.pageRepository.remove(page);
    }
}
