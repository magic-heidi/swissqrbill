import { SVG } from 'svg-engine';
import { Data } from '../shared/types.js';
export declare class SwissQRCode {
    instance: SVG;
    /**
     * Creates a Swiss QR Code.
     *
     * @param data The data to be encoded in the QR code.
     * @param size The size of the QR code in mm.
     * @throws { ValidationError } Throws an error if the data is invalid.
     */
    constructor(data: Data, size?: number);
    /**
     * Outputs the SVG as a string.
     *
     * @returns The outerHTML of the SVG element.
     */
    toString(): string;
    /**
     * Returns the SVG element.
     *
     * @returns The SVG element.
     */
    get element(): SVGElement;
}
