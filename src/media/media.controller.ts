import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    Get,
    Param,
    Res,
    Delete,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Response } from 'express';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { v4 as uuidv4 } from 'uuid';

const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueName);
    },
});

const imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/i)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

@Controller('api/media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage,
            fileFilter: imageFileFilter,
            limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            filename: file.filename,
            originalname: file.originalname,
            url: this.mediaService.getFileUrl(file.filename),
            size: file.size,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload-multiple')
    @UseInterceptors(
        FilesInterceptor('files', 10, {
            storage,
            fileFilter: imageFileFilter,
            limits: { fileSize: 5 * 1024 * 1024 },
        }),
    )
    uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
        return files.map((file) => ({
            filename: file.filename,
            originalname: file.originalname,
            url: this.mediaService.getFileUrl(file.filename),
            size: file.size,
        }));
    }

    @Get(':filename')
    serveFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = this.mediaService.getFilePath(filename);
        return res.sendFile(filePath);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':filename')
    removeFile(@Param('filename') filename: string) {
        this.mediaService.removeFile(filename);
        return { message: 'File deleted successfully' };
    }
}
