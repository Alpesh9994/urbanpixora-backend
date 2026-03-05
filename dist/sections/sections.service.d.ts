import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { Page } from '../pages/entities/page.entity';
export declare class SectionsService {
    private readonly sectionRepository;
    private readonly pageRepository;
    constructor(sectionRepository: Repository<Section>, pageRepository: Repository<Page>);
    create(createSectionDto: CreateSectionDto): Promise<Section>;
    findAllByPage(pageId: string): Promise<Section[]>;
    findOne(id: string): Promise<Section>;
    update(id: string, updateSectionDto: UpdateSectionDto): Promise<Section>;
    reorder(sections: {
        id: string;
        order: number;
    }[]): Promise<void>;
    remove(id: string): Promise<void>;
}
