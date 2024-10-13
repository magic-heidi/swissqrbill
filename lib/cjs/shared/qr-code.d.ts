import { Data } from './types.js';
export declare function generateQRData(data: Data): string;
export declare function renderQRCode(data: Data, size: number, renderBlockFunction: (x: number, y: number, blockSize: number) => void): void;
export declare function renderSwissCross(size: number, renderRectFunction: (x: number, y: number, width: number, height: number, fillColor: string) => void): void;
