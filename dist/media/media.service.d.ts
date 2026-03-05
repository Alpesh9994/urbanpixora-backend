export declare class MediaService {
    private readonly uploadDir;
    constructor();
    getFilePath(filename: string): string;
    getFileUrl(filename: string): string;
    removeFile(filename: string): void;
}
