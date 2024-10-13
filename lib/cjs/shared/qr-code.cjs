"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const cleaner = require("./cleaner.cjs");
const qrCodeGenerator = require("./qr-code-generator.cjs");
const validator = require("./validator.cjs");
const utils = require("./utils.cjs");
function generateQRData(data) {
  var _a, _b, _c, _d, _e, _f, _g;
  const cleanedData = cleaner.cleanData(data);
  validator.validateData(cleanedData);
  const amount = (_a = cleanedData.amount) == null ? void 0 : _a.toFixed(2);
  const reference = utils.getReferenceType(cleanedData.reference);
  const qrData = [
    "SPC",
    // Swiss Payments Code
    "0200",
    // Version
    "1",
    // Coding Type UTF-8
    (_b = cleanedData.creditor.account) != null ? _b : "",
    // IBAN
    ...cleanedData.creditor.buildingNumber ? [
      "S",
      // Address Type
      cleanedData.creditor.name,
      // Name
      cleanedData.creditor.address,
      // Address
      `${cleanedData.creditor.buildingNumber}`,
      // Building number
      `${cleanedData.creditor.zip}`,
      // Zip
      cleanedData.creditor.city
      // City
    ] : [
      "K",
      // Address Type
      cleanedData.creditor.name,
      // Name
      cleanedData.creditor.address,
      // Address
      `${cleanedData.creditor.zip} ${cleanedData.creditor.city}`,
      // Zip and city
      "",
      // Empty zip field
      ""
      // Empty city field
    ],
    cleanedData.creditor.country,
    // Country
    "",
    // 1x Empty
    "",
    // 2x Empty
    "",
    // 3x Empty
    "",
    // 4x Empty
    "",
    // 5x Empty
    "",
    // 6x Empty
    "",
    // 7x Empty
    amount != null ? amount : "",
    // Amount
    cleanedData.currency,
    // Currency
    ...cleanedData.debtor ? [
      ...cleanedData.debtor.buildingNumber ? [
        "S",
        // Address Type
        cleanedData.debtor.name,
        // Name
        cleanedData.debtor.address,
        // Address
        `${cleanedData.debtor.buildingNumber}`,
        // Building number
        `${cleanedData.debtor.zip}`,
        // Zip
        cleanedData.debtor.city
        // City
      ] : [
        "K",
        // Address Type
        cleanedData.debtor.name,
        // Name
        cleanedData.debtor.address,
        // Address
        `${cleanedData.debtor.zip} ${cleanedData.debtor.city}`,
        // Zip and city
        "",
        // Empty zip field
        ""
        // Empty city field
      ],
      (_d = (_c = cleanedData.debtor) == null ? void 0 : _c.country) != null ? _d : ""
      // Country
    ] : [
      "",
      // Empty address type
      "",
      // Empty name
      "",
      // Empty address
      "",
      // Empty zip and city
      "",
      // Empty zip field
      "",
      // Empty city field
      ""
      // Empty country
    ],
    reference,
    // Reference type
    (_e = cleanedData.reference) != null ? _e : "",
    // Reference
    (_f = cleanedData.message) != null ? _f : "",
    // Unstructured message
    "EPD",
    // End of payment data
    (_g = cleanedData.additionalInformation) != null ? _g : "",
    // Additional information
    ...cleanedData.av1 ? [
      cleanedData.av1
    ] : [],
    ...cleanedData.av2 ? [
      cleanedData.av2
    ] : []
  ];
  return qrData.join("\n");
}
function renderQRCode(data, size, renderBlockFunction) {
  const qrData = generateQRData(data);
  const eci = qrCodeGenerator.qrcodegen.QrSegment.makeEci(26);
  const segments = qrCodeGenerator.qrcodegen.QrSegment.makeSegments(qrData);
  const qrCode = qrCodeGenerator.qrcodegen.QrCode.encodeSegments([eci, ...segments], qrCodeGenerator.qrcodegen.QrCode.Ecc.MEDIUM, 10, 25);
  const blockSize = size / qrCode.size;
  for (let x = 0; x < qrCode.size; x++) {
    const xPos = x * blockSize;
    for (let y = 0; y < qrCode.size; y++) {
      const yPos = y * blockSize;
      if (qrCode.getModule(x, y)) {
        renderBlockFunction(xPos, yPos, blockSize);
      }
    }
  }
}
function renderSwissCross(size, renderRectFunction) {
  const scale = size / utils.mm2pt(46);
  const swissCrossWhiteBackgroundSize = utils.mm2pt(7) * scale;
  const swissCrossBlackBackgroundSize = utils.mm2pt(6) * scale;
  const swissCrossThickness = utils.mm2pt(1.17) * scale;
  const swissCrossLength = utils.mm2pt(3.89) * scale;
  renderRectFunction(
    size / 2 - swissCrossWhiteBackgroundSize / 2,
    size / 2 - swissCrossWhiteBackgroundSize / 2,
    swissCrossWhiteBackgroundSize,
    swissCrossWhiteBackgroundSize,
    "white"
  );
  renderRectFunction(
    size / 2 - swissCrossBlackBackgroundSize / 2,
    size / 2 - swissCrossBlackBackgroundSize / 2,
    swissCrossBlackBackgroundSize,
    swissCrossBlackBackgroundSize,
    "black"
  );
  renderRectFunction(
    size / 2 - swissCrossLength / 2,
    size / 2 - swissCrossThickness / 2,
    swissCrossLength,
    swissCrossThickness,
    "white"
  );
  renderRectFunction(
    size / 2 - swissCrossThickness / 2,
    size / 2 - swissCrossLength / 2,
    swissCrossThickness,
    swissCrossLength,
    "white"
  );
}
exports.generateQRData = generateQRData;
exports.renderQRCode = renderQRCode;
exports.renderSwissCross = renderSwissCross;
