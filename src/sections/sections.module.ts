import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section } from './entities/section.entity';
import { Page } from '../pages/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section, Page])],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule { }
