import { Data } from '../shared/types.js';
export declare class SwissQRCode {
    private size;
    private data;
    /**
     * Creates a Swiss QR Code.
     *
     * @param data The data to be encoded in the QR code.
     * @param size The size of the QR code in mm.
     * @throws { ValidationError } Throws an error if the data is invalid.
     */
    constructor(data: Data, size?: number);
    /**
     * Attaches the Swiss QR Code to a PDF document.
     *
     * @param doc The PDF document to attach the Swiss QR Code to.
     * @param x The horizontal position in points where the Swiss QR Code will be placed.
     * @param y The vertical position in points where the Swiss QR Code will be placed.
     */
    attachTo(doc: PDFKit.PDFDocument, x?: number, y?: number): void;
}
