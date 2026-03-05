import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    create(createPageDto: CreatePageDto): Promise<import("./entities/page.entity").Page>;
    findAll(): Promise<import("./entities/page.entity").Page[]>;
    findBySlug(slug: string): Promise<import("./entities/page.entity").Page>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<import("./entities/page.entity").Page>;
    remove(id: string): Promise<void>;
}
