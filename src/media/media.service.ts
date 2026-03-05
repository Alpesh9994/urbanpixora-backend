import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MediaService {
    private readonly uploadDir = path.join(process.cwd(), 'uploads');

    constructor() {
        // Ensure uploads directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    getFilePath(filename: string): string {
        return path.join(this.uploadDir, filename);
    }

    getFileUrl(filename: string): string {
        // Return full URL for frontend usage
        const port = process.env.PORT || 3000;
        return `http://localhost:${port}/uploads/${filename}`;
    }

    removeFile(filename: string): void {
        const filePath = this.getFilePath(filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}
