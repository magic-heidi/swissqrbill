import { cleanData } from "../shared/cleaner.js";
import { renderQRCode, renderSwissCross } from "../shared/qr-code.js";
import { validateData } from "../shared/validator.js";
import { mm2pt } from "../shared/utils.js";
class SwissQRCode {
  /**
   * Creates a Swiss QR Code.
   *
   * @param data The data to be encoded in the QR code.
   * @param size The size of the QR code in mm.
   * @param theme
   * @throws { ValidationError } Throws an error if the data is invalid.
   */
  constructor(data, size = 46, theme) {
    this.theme = theme;
    this.size = mm2pt(size);
    this.data = cleanData(data);
    validateData(this.data);
  }
  /**
   * Attaches the Swiss QR Code to a PDF document.
   *
   * @param doc The PDF document to attach the Swiss QR Code to.
   * @param x The horizontal position in points where the Swiss QR Code will be placed.
   * @param y The vertical position in points where the Swiss QR Code will be placed.
   */
  attachTo(doc, x = ((_a) => (_a = doc.x) != null ? _a : 0)(), y = ((_b) => (_b = doc.y) != null ? _b : 0)()) {
    var _a2, _b2;
    doc.save();
    doc.translate(x, y);
    renderQRCode(this.data, this.size, (xPos, yPos, blockSize) => {
      doc.rect(
        xPos,
        yPos,
        blockSize,
        blockSize
      );
    });
    doc.fillColor((_b2 = (_a2 = this.theme) == null ? void 0 : _a2.fillColor) != null ? _b2 : "black");
    doc.fill();
    renderSwissCross(this.size, (xPos, yPos, width, height, fillColor) => {
      doc.rect(
        xPos,
        yPos,
        width,
        height
      ).fillColor(fillColor).fill();
    }, this.theme);
    doc.restore();
  }
}
export {
  SwissQRCode
};
