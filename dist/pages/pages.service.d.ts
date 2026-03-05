import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
export declare class PagesService {
    private readonly pageRepository;
    constructor(pageRepository: Repository<Page>);
    create(createPageDto: CreatePageDto): Promise<Page>;
    findAll(): Promise<Page[]>;
    findOne(id: string): Promise<Page>;
    findBySlug(slug: string): Promise<Page>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<Page>;
    remove(id: string): Promise<void>;
}
