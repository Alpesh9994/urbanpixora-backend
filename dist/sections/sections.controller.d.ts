import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    create(createSectionDto: CreateSectionDto): Promise<import("./entities/section.entity").Section>;
    findAllByPage(pageId: string): Promise<import("./entities/section.entity").Section[]>;
    findOne(id: string): Promise<import("./entities/section.entity").Section>;
    reorder(sections: {
        id: string;
        order: number;
    }[]): Promise<void>;
    update(id: string, updateSectionDto: UpdateSectionDto): Promise<import("./entities/section.entity").Section>;
    remove(id: string): Promise<void>;
}
