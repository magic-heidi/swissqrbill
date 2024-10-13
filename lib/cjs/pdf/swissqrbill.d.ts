import { Data, PDFOptions } from '../shared/types.js';
/**
 * The SwissQRBill class creates the Payment Part with the QR Code. It can be attached to any PDFKit document instance
 * using the {@link SwissQRBill.attachTo} method.
 *
 * @example
 * ```ts
 * const data = {
 *   amount: 1994.75,
 *   creditor: {
 *     account: "CH44 3199 9123 0008 8901 2",
 *     address: "Musterstrasse",
 *     buildingNumber: 7,
 *     city: "Musterstadt",
 *     country: "CH",
 *     name: "SwissQRBill",
 *     zip: 1234
 *   },
 *   currency: "CHF",
 *   debtor: {
 *     address: "Musterstrasse",
 *     buildingNumber: 1,
 *     city: "Musterstadt",
 *     country: "CH",
 *     name: "Peter Muster",
 *     zip: 1234
 *   },
 *   reference: "21 00000 00003 13947 14300 09017"
 * };
 *
 * const pdf = new PDFDocument({ autoFirstPage: false });
 * const qrBill = new SwissQRBill(data);
 *
 * const stream = createWriteStream("qr-bill.pdf");
 *
 * qrBill.attachTo(pdf);
 * pdf.pipe(stream);
 * pdf.end();
 * ```
 */
export declare class SwissQRBill {
    private data;
    private scissors;
    private separate;
    private outlines;
    private language;
    private font;
    private _x;
    private _y;
    /**
     * Creates a new SwissQRBill instance.
     *
     * @param data The data to be used for the QR Bill.
     * @param options Options to define how the QR Bill should be rendered.
     * @throws { ValidationError } Throws an error if the data is invalid.
     */
    constructor(data: Data, options?: PDFOptions);
    /**
     * Attaches the QR-Bill to a PDFKit document instance. It will create a new page with the size of the QR-Slip if not
     * enough space is left on the current page.
     *
     * @param doc The PDFKit instance.
     * @param x The horizontal position in points where the QR Bill will be placed.
     * @param y The vertical position in points where the QR Bill will be placed.
     */
    attachTo(doc: PDFKit.PDFDocument, x?: number, y?: number): void;
    /**
     * Checks whether there is enough space on the current page to add the QR Bill.
     *
     * @param doc The PDFKit document instance.
     * @param xPosition The horizontal position where the QR Bill will be placed.
     * @param yPosition The vertical position where the QR Bill will be placed.
     * @returns `true` if there is enough space, otherwise `false`.
     */
    static isSpaceSufficient(doc: PDFKit.PDFDocument, xPosition: number, yPosition: number): boolean;
    /**
     * The horizontal size of the QR Bill.
     */
    static readonly width: number;
    /**
     * The vertical size of the QR Bill.
     */
    static readonly height: number;
    private x;
    private y;
    private render;
    private formatAddress;
    private addRectangle;
}
