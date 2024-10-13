"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const svgEngine = require("svg-engine");
const qrCode = require("../shared/qr-code.cjs");
class SwissQRCode {
  /**
   * Creates a Swiss QR Code.
   *
   * @param data The data to be encoded in the QR code.
   * @param size The size of the QR code in mm.
   * @throws { ValidationError } Throws an error if the data is invalid.
   */
  constructor(data, size = 46) {
    this.instance = new svgEngine.SVG();
    this.instance.width(`${size}mm`);
    this.instance.height(`${size}mm`);
    qrCode.renderQRCode(data, size, (xPos, yPos, blockSize) => {
      this.instance.addRect(
        `${xPos}mm`,
        `${yPos}mm`,
        `${blockSize}mm`,
        `${blockSize}mm`
      ).fill("black");
    });
    qrCode.renderSwissCross(size, (xPos, yPos, width, height, fillColor) => {
      this.instance.addRect(
        `${xPos}mm`,
        `${yPos}mm`,
        `${width}mm`,
        `${height}mm`
      ).fill(fillColor);
    });
  }
  /**
   * Outputs the SVG as a string.
   *
   * @returns The outerHTML of the SVG element.
   */
  toString() {
    return this.instance.outerHTML;
  }
  /**
   * Returns the SVG element.
   *
   * @returns The SVG element.
   */
  get element() {
    return this.instance.element;
  }
}
exports.SwissQRCode = SwissQRCode;
