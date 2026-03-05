import type { Response } from 'express';
import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadFile(file: Express.Multer.File): {
        filename: string;
        originalname: string;
        url: string;
        size: number;
    };
    uploadMultiple(files: Express.Multer.File[]): {
        filename: string;
        originalname: string;
        url: string;
        size: number;
    }[];
    serveFile(filename: string, res: Response): void;
    removeFile(filename: string): {
        message: string;
    };
}
