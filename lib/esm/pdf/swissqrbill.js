var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { SwissQRCode } from "./swissqrcode.js";
import { cleanData } from "../shared/cleaner.js";
import { translations } from "../shared/translations.js";
import { validateData } from "../shared/validator.js";
import { mm2pt, formatIBAN, formatReference, pt2mm, formatAmount, getReferenceType } from "../shared/utils.js";
const _SwissQRBill = class _SwissQRBill {
  /**
   * Creates a new SwissQRBill instance.
   *
   * @param data The data to be used for the QR Bill.
   * @param options Options to define how the QR Bill should be rendered.
   * @throws { ValidationError } Throws an error if the data is invalid.
   */
  constructor(data, options) {
    this.scissors = true;
    this.separate = false;
    this.outlines = true;
    this.language = "DE";
    this.font = "Helvetica";
    this._x = 0;
    this._y = 0;
    this.data = cleanData(data);
    validateData(this.data);
    this.language = (options == null ? void 0 : options.language) !== void 0 ? options.language : this.language;
    this.outlines = (options == null ? void 0 : options.outlines) !== void 0 ? options.outlines : this.outlines;
    this.font = (options == null ? void 0 : options.fontName) !== void 0 ? options.fontName : this.font;
    if ((options == null ? void 0 : options.scissors) !== void 0) {
      this.scissors = options.scissors;
      this.separate = !options.scissors;
    }
    if ((options == null ? void 0 : options.separate) !== void 0) {
      this.separate = options.separate;
      this.scissors = !options.separate;
    }
    if ((options == null ? void 0 : options.scissors) === false && (options == null ? void 0 : options.separate) === false) {
      this.separate = false;
      this.scissors = false;
    }
  }
  /**
   * Attaches the QR-Bill to a PDFKit document instance. It will create a new page with the size of the QR-Slip if not
   * enough space is left on the current page.
   *
   * @param doc The PDFKit instance.
   * @param x The horizontal position in points where the QR Bill will be placed.
   * @param y The vertical position in points where the QR Bill will be placed.
   */
  attachTo(doc, x = 0, y = ((_a) => (_a = doc.page) == null ? void 0 : _a.height)() ? ((_b) => (_b = doc.page) == null ? void 0 : _b.height)() - mm2pt(105) : 0) {
    if (!_SwissQRBill.isSpaceSufficient(doc, x, y)) {
      doc.addPage({
        margin: 0,
        size: [_SwissQRBill.width, _SwissQRBill.height]
      });
      x = 0;
      y = 0;
    }
    this._x = x;
    this._y = y;
    this.render(doc);
  }
  /**
   * Checks whether there is enough space on the current page to add the QR Bill.
   *
   * @param doc The PDFKit document instance.
   * @param xPosition The horizontal position where the QR Bill will be placed.
   * @param yPosition The vertical position where the QR Bill will be placed.
   * @returns `true` if there is enough space, otherwise `false`.
   */
  static isSpaceSufficient(doc, xPosition, yPosition) {
    if (!doc.page) {
      return false;
    }
    return Math.round(xPosition + _SwissQRBill.width) <= Math.round(doc.page.width) && Math.round(doc.y + _SwissQRBill.height) <= Math.round(doc.page.height) && Math.round(yPosition + _SwissQRBill.height) <= Math.round(doc.page.height);
  }
  x(millimeters = 0) {
    return this._x + mm2pt(millimeters);
  }
  y(millimeters = 0) {
    return this._y + mm2pt(millimeters);
  }
  render(doc) {
    if (this.outlines) {
      if (doc.page.height > mm2pt(105)) {
        doc.moveTo(this.x(), this.y()).lineTo(this.x(210), this.y()).lineWidth(0.75).strokeOpacity(1).dash(1, { size: 1 }).strokeColor("black").stroke();
      }
      doc.moveTo(this.x(62), this.y()).lineTo(this.x(62), this.y(105)).lineWidth(0.75).strokeOpacity(1).dash(1, { size: 1 }).strokeColor("black").stroke();
    }
    if (this.scissors) {
      const scissorsTop = "4.545 -1.803 m 4.06 -2.388 3.185 -2.368 2.531 -2.116 c -1.575 -0.577 l -2.769 -1.23 -3.949 -1.043 -3.949 -1.361 c -3.949 -1.61 -3.721 -1.555 -3.755 -2.203 c -3.788 -2.825 -4.437 -3.285 -5.05 -3.244 c -5.664 -3.248 -6.3 -2.777 -6.305 -2.129 c -6.351 -1.476 -5.801 -0.869 -5.152 -0.826 c -4.391 -0.713 -3.043 -1.174 -2.411 -0.041 c -2.882 0.828 -3.718 0.831 -4.474 0.787 c -5.101 0.751 -5.855 0.931 -6.154 1.547 c -6.443 2.138 -6.16 2.979 -5.496 3.16 c -4.826 3.406 -3.906 3.095 -3.746 2.325 c -3.623 1.731 -4.044 1.452 -3.882 1.236 c -3.76 1.073 -2.987 1.168 -1.608 0.549 c 2.838 2.117 l 3.4 2.273 4.087 2.268 4.584 1.716 c -0.026 -0.027 l 4.545 -1.803 l h -4.609 -2.753 m -3.962 -2.392 -4.015 -1.411 -4.687 -1.221 c -5.295 -1.009 -6.073 -1.6 -5.879 -2.26 c -5.765 -2.801 -5.052 -3 -4.609 -2.753 c h -4.581 1.256 m -3.906 1.505 -4.02 2.648 -4.707 2.802 c -5.163 2.96 -5.814 2.733 -5.86 2.196 c -5.949 1.543 -5.182 0.954 -4.581 1.256 c h";
      const scissorsCenter = " 1.803 4.545 m 2.388 4.06 2.368 3.185 2.116 2.531 c 0.577 -1.575 l 1.23 -2.769 1.043 -3.949 1.361 -3.949 c 1.61 -3.949 1.555 -3.721 2.203 -3.755 c 2.825 -3.788 3.285 -4.437 3.244 -5.05 c 3.248 -5.664 2.777 -6.3 2.129 -6.305 c 1.476 -6.351 0.869 -5.801 0.826 -5.152 c 0.713 -4.391 1.174 -3.043 0.041 -2.411 c -0.828 -2.882 -0.831 -3.718 -0.787 -4.474 c -0.751 -5.101 -0.931 -5.855 -1.547 -6.154 c -2.138 -6.443 -2.979 -6.16 -3.16 -5.496 c -3.406 -4.826 -3.095 -3.906 -2.325 -3.746 c -1.731 -3.623 -1.452 -4.044 -1.236 -3.882 c -1.073 -3.76 -1.168 -2.987 -0.549 -1.608 c -2.117 2.838 l -2.273 3.4 -2.268 4.087 -1.716 4.584 c 0.027 -0.026 l 1.803 4.545 l h 2.753 -4.609 m 2.392 -3.962 1.411 -4.015 1.221 -4.687 c 1.009 -5.295 1.6 -6.073 2.26 -5.879 c 2.801 -5.765 3 -5.052 2.753 -4.609 c h -1.256 -4.581 m -1.505 -3.906 -2.648 -4.02 -2.802 -4.707 c -2.96 -5.163 -2.733 -5.814 -2.196 -5.86 c -1.543 -5.949 -0.954 -5.182 -1.256 -4.581 c h";
      if (doc.page.height > mm2pt(105)) {
        doc.save();
        doc.translate(this.x(105), this.y());
        doc.addContent(scissorsTop).fillColor("black").fill();
        doc.restore();
      }
      doc.save();
      doc.translate(this.x(62), this.y() + 30);
      doc.addContent(scissorsCenter).fillColor("black").fill();
      doc.restore();
    }
    if (this.separate) {
      if (doc.page.height > mm2pt(105)) {
        doc.fontSize(11);
        doc.font(this.font);
        doc.text(translations[this.language].separate, 0, this.y() - 12, {
          align: "center",
          width: mm2pt(210)
        });
      }
    }
    doc.fontSize(11);
    doc.font(`${this.font}-Bold`);
    doc.text(translations[this.language].receipt, this.x(5), this.y(5), {
      align: "left",
      width: mm2pt(52)
    });
    doc.fontSize(6);
    doc.font(`${this.font}-Bold`);
    doc.text(translations[this.language].account, this.x(5), this.y(12), {
      lineGap: 1,
      width: mm2pt(52)
    });
    doc.fontSize(8);
    doc.font(this.font);
    doc.text(`${formatIBAN(this.data.creditor.account)}
${this.formatAddress(this.data.creditor)}`, {
      lineGap: -0.5,
      width: mm2pt(52)
    });
    doc.fontSize(9);
    doc.moveDown();
    if (this.data.reference !== void 0) {
      doc.fontSize(6);
      doc.font(`${this.font}-Bold`);
      doc.text(translations[this.language].reference, {
        lineGap: 1,
        width: mm2pt(52)
      });
      doc.fontSize(8);
      doc.font(this.font);
      doc.text(formatReference(this.data.reference), {
        lineGap: -0.5,
        width: mm2pt(52)
      });
      doc.fontSize(9);
      doc.moveDown();
    }
    if (this.data.debtor !== void 0) {
      doc.fontSize(6);
      doc.font(`${this.font}-Bold`);
      doc.text(translations[this.language].payableBy, {
        lineGap: 1,
        width: mm2pt(52)
      });
      doc.fontSize(8);
      doc.font(this.font);
      doc.text(this.formatAddress(this.data.debtor), {
        lineGap: -0.5,
        width: mm2pt(52)
      });
    } else {
      doc.fontSize(6);
      doc.font(`${this.font}-Bold`);
      doc.text(translations[this.language].payableByName, {
        lineGap: 1,
        width: mm2pt(52)
      });
      this.addRectangle(doc, 5, pt2mm(doc.y - this.y()), 52, 20);
    }
    doc.fontSize(6);
    doc.font(`${this.font}-Bold`);
    doc.text(translations[this.language].currency, this.x(5), this.y(68), {
      lineGap: 1,
      width: mm2pt(15)
    });
    const amountXPosition = this.data.amount === void 0 ? 18 : 27;
    doc.text(translations[this.language].amount, this.x(amountXPosition), this.y(68), {
      lineGap: 1,
      width: mm2pt(52 - amountXPosition)
    });
    doc.fontSize(8);
    doc.font(this.font);
    doc.text(this.data.currency, this.x(5), this.y(71), {
      lineGap: -0.5,
      width: mm2pt(15)
    });
    if (this.data.amount !== void 0) {
      doc.text(formatAmount(this.data.amount), this.x(amountXPosition), this.y(71), {
        lineGap: -0.5,
        width: mm2pt(52 - amountXPosition)
      });
    } else {
      this.addRectangle(doc, 27, 68, 30, 10);
    }
    doc.fontSize(6);
    doc.font(`${this.font}-Bold`);
    doc.text(translations[this.language].acceptancePoint, this.x(5), this.y(82), {
      align: "right",
      height: mm2pt(18),
      lineGap: 1,
      width: mm2pt(52)
    });
    doc.fontSize(11);
    doc.font(`${this.font}-Bold`);
    doc.text(translations[this.language].paymentPart, this.x(67), this.y(5), {
      align: "left",
      lineGap: 1,
      width: mm2pt(51)
    });
    const swissQRCode = new SwissQRCode(this.data);
    swissQRCode.attachTo(doc, this.x(67), this.y(17));
    doc.fontSize(8);
    doc.font(`${this.font}-Bold`);
    doc.text(translations[this.language].currency, this.x(67), this.y(68), {
      lineGap: 1,
      width: mm2pt(15)
    });
    doc.text(translations[this.language].amount, this.x(89), this.y(68), {
      width: mm2pt(29)
    });
    doc.fontSize(10);
    doc.font(this.font);
    doc.text(this.data.currency, this.x(67), this.y(72), {
      lineGap: -0.5,
      width: mm2pt(15)
    });
    if (this.data.amount !== void 0) {
      doc.text(formatAmount(this.data.amount), this.x(89), this.y(72), {
        lineGap: -0.5,
        width: mm2pt(29)
      });
    } else {
      this.addRectangle(doc, 78, 72, 40, 15);
    }
    if (this.data.av1 !== void 0) {
      const [scheme, data] = this.data.av1.split(/(\/.+)/);
      doc.fontSize(7);
      doc.font(`${this.font}-Bold`);
      doc.text(scheme, this.x(67), this.y(90), {
        continued: true,
        height: mm2pt(3),
        lineGap: 1,
        width: mm2pt(138)
      });
      doc.font(this.font);
      doc.text(this.data.av1.length > 90 ? `${data.substring(0, 87)}...` : data, {
        continued: false
      });
    }
    if (this.data.av2 !== void 0) {
      const [scheme, data] = this.data.av2.split(/(\/.+)/);
      doc.fontSize(7);
      doc.font(`${this.font}-Bold`);
      doc.text(scheme, this.x(67), this.y(93), {
        continued: true,
        height: mm2pt(3),
        lineGap: 1,
        width: mm2pt(138)
      });
      doc.font(this.font);
      doc.text(this.data.av2.length > 90 ? `${data.substring(0, 87)}...` : data, {
        lineGap: -0.5
      });
    }
    doc.fontSize(8);
    doc.font(`${this.font}-Bold`);
    doc.text(translations[this.language].account, this.x(118), this.y(5), {
      lineGap: 1,
      width: mm2pt(87)
    });
    doc.fontSize(10);
    doc.font(this.font);
    doc.text(`${formatIBAN(this.data.creditor.account)}
${this.formatAddress(this.data.creditor)}`, {
      lineGap: -0.75,
      width: mm2pt(87)
    });
    doc.fontSize(9);
    doc.moveDown();
    if (this.data.reference !== void 0) {
      doc.fontSize(8);
      doc.font(`${this.font}-Bold`);
      doc.text(translations[this.language].reference, {
        lineGap: 1,
        width: mm2pt(87)
      });
      doc.fontSize(10);
      doc.font(this.font);
      doc.text(formatReference(this.data.reference), {
        lineGap: -0.75,
        width: mm2pt(87)
      });
      doc.fontSize(9);
      doc.moveDown();
    }
    if (this.data.message !== void 0 || this.data.additionalInformation !== void 0) {
      doc.fontSize(8);
      doc.font(`${this.font}-Bold`);
      doc.text(translations[this.language].additionalInformation, {
        lineGap: 1,
        width: mm2pt(87)
      });
      doc.fontSize(10);
      doc.font(this.font);
      const options = {
        lineGap: -0.75,
        width: mm2pt(87)
      };
      const singleLineHeight = doc.heightOfString("A", options);
      const referenceType = getReferenceType(this.data.reference);
      const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
      const linesOfAdditionalInformation = this.data.additionalInformation !== void 0 ? doc.heightOfString(this.data.additionalInformation, options) / singleLineHeight : 0;
      if (this.data.additionalInformation !== void 0) {
        if (referenceType === "QRR" || referenceType === "SCOR") {
          if (this.data.message !== void 0) {
            doc.text(this.data.message, __spreadProps(__spreadValues({}, options), { ellipsis: true, height: singleLineHeight, lineBreak: false }));
          }
        } else {
          if (this.data.message !== void 0) {
            const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
            doc.text(this.data.message, __spreadProps(__spreadValues({}, options), { ellipsis: true, height: singleLineHeight * maxLinesOfMessage, lineBreak: true }));
          }
        }
        doc.text(this.data.additionalInformation, options);
      } else if (this.data.message !== void 0) {
        doc.text(this.data.message, __spreadProps(__spreadValues({}, options), { ellipsis: true, height: singleLineHeight * maxLines, lineBreak: true }));
      }
      doc.fontSize(9);
      doc.moveDown();
    }
    if (this.data.debtor !== void 0) {
      doc.fontSize(8);
      doc.font(`${this.font}-Bold`);
      doc.text(translations[this.language].payableBy, {
        lineGap: 1,
        width: mm2pt(87)
      });
      doc.fontSize(10);
      doc.font(this.font);
      doc.text(this.formatAddress(this.data.debtor), {
        lineGap: -0.75,
        width: mm2pt(87)
      });
    } else {
      doc.fontSize(8);
      doc.font(`${this.font}-Bold`);
      doc.text(translations[this.language].payableByName, {
        lineGap: 1,
        width: mm2pt(87)
      });
      this.addRectangle(doc, 118, pt2mm(doc.y - this.y()), 65, 25);
    }
  }
  formatAddress(data) {
    const countryPrefix = data.country !== "CH" ? `${data.country} - ` : "";
    if (data.buildingNumber !== void 0) {
      return `${data.name}
${data.address} ${data.buildingNumber}
${countryPrefix}${data.zip} ${data.city}`;
    }
    return `${data.name}
${data.address}
${countryPrefix}${data.zip} ${data.city}`;
  }
  addRectangle(doc, x, y, width, height) {
    const length = 3;
    doc.moveTo(this.x(x + length), this.y(y)).lineTo(this.x(x), this.y(y)).lineTo(this.x(x), this.y(y + length)).moveTo(this.x(x), this.y(y + height - length)).lineTo(this.x(x), this.y(y + height)).lineTo(this.x(x + length), this.y(y + height)).moveTo(this.x(x + width - length), this.y(y + height)).lineTo(this.x(x + width), this.y(y + height)).lineTo(this.x(x + width), this.y(y + height - length)).moveTo(this.x(x + width), this.y(y + length)).lineTo(this.x(x + width), this.y(y)).lineTo(this.x(x + width - length), this.y(y)).lineWidth(0.75).undash().strokeColor("black").stroke();
  }
};
_SwissQRBill.width = mm2pt(210);
_SwissQRBill.height = mm2pt(105);
let SwissQRBill = _SwissQRBill;
export {
  SwissQRBill
};
