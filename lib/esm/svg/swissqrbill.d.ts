import { SVG } from 'svg-engine';
import { Data, SVGOptions } from '../shared/types.js';
/**
 * The SwissQRBill class creates the Payment Part with the QR Code as an SVG.
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
 * const svg = new SwissQRBill(data);
 * writeFileSync("qr-bill.svg", svg.toString());
 * ```
 */
export declare class SwissQRBill {
    instance: SVG;
    private scissors;
    private outlines;
    private language;
    private font;
    private data;
    constructor(data: Data, options?: SVGOptions);
    /**
     * Outputs the SVG as a string.
     *
     * @returns The outerHTML of the SVG.
     */
    toString(): string;
    /**
     * Returns the SVG element.
     *
     * @returns The SVG element.
     */
    get element(): SVGElement;
    private _render;
    private _renderQRCode;
    private _formatAddress;
    private _getLineCountOfText;
    private _fitTextToWidth;
    private _ellipsis;
    private _addRectangle;
}
