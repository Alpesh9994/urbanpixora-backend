import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('api/sections')
export class SectionsController {
    constructor(private readonly sectionsService: SectionsService) { }

    @Post()
    create(@Body() createSectionDto: CreateSectionDto) {
        return this.sectionsService.create(createSectionDto);
    }

    @Get('page/:pageId')
    findAllByPage(@Param('pageId') pageId: string) {
        return this.sectionsService.findAllByPage(pageId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sectionsService.findOne(id);
    }

    @Patch('reorder')
    reorder(@Body() sections: { id: string; order: number }[]) {
        return this.sectionsService.reorder(sections);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
        return this.sectionsService.update(id, updateSectionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sectionsService.remove(id);
    }
}
