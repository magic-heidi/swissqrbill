import { cleanData } from "./cleaner.js";
import { qrcodegen } from "./qr-code-generator.js";
import { QRTheme } from "./qr-theme.js";
import { validateData } from "./validator.js";
import { getReferenceType, mm2pt } from "./utils.js";
function generateQRData(data) {
  var _a, _b, _c, _d, _e;
  const cleanedData = cleanData(data);
  validateData(cleanedData);
  const amount = (_a = cleanedData.amount) == null ? void 0 : _a.toFixed(2);
  const reference = getReferenceType(cleanedData.reference);
  const qrData = [
    "SPC",
    // Swiss Payments Code
    "0200",
    // Version
    "1",
    // Coding Type UTF-8
    (_b = cleanedData.creditor.account) != null ? _b : "",
    // IBAN
    "S",
    // Address Type
    cleanedData.creditor.name,
    // Name
    cleanedData.creditor.address,
    // Address
    cleanedData.creditor.buildingNumber ? `${cleanedData.creditor.buildingNumber}` : "",
    `${cleanedData.creditor.zip}`,
    // Zip
    cleanedData.creditor.city,
    // City
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
      "S",
      // Address Type
      cleanedData.debtor.name,
      // Name
      cleanedData.debtor.address,
      // Address
      cleanedData.debtor.buildingNumber ? `${cleanedData.debtor.buildingNumber}` : "",
      `${cleanedData.debtor.zip}`,
      // Zip
      cleanedData.debtor.city,
      // City
      (_c = cleanedData.debtor.country) != null ? _c : ""
      // Country
    ] : [
      "",
      // Empty address type
      "",
      // Empty name
      "",
      // Empty address
      "",
      // Empty building number
      "",
      // Empty zip field
      "",
      // Empty city field
      ""
      // Empty country
    ],
    reference,
    // Reference type
    (_d = cleanedData.reference) != null ? _d : "",
    // Reference
    (_e = cleanedData.message) != null ? _e : "",
    // Unstructured message
    "EPD",
    // End of payment data
    ...cleanedData.additionalInformation ? [
      cleanedData.additionalInformation
    ] : [],
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
  const eci = qrcodegen.QrSegment.makeEci(26);
  const segments = qrcodegen.QrSegment.makeSegments(qrData);
  const qrCode = qrcodegen.QrCode.encodeSegments([eci, ...segments], qrcodegen.QrCode.Ecc.MEDIUM, 10, 25, -1, false);
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
function renderSwissCross(size, renderRectFunction, theme = QRTheme.resolve()) {
  const scale = size / mm2pt(46);
  const swissCrossWhiteBackgroundSize = mm2pt(7) * scale;
  const swissCrossBlackBackgroundSize = mm2pt(6) * scale;
  const swissCrossThickness = mm2pt(1.17) * scale;
  const swissCrossLength = mm2pt(3.89) * scale;
  renderRectFunction(
    size / 2 - swissCrossWhiteBackgroundSize / 2,
    size / 2 - swissCrossWhiteBackgroundSize / 2,
    swissCrossWhiteBackgroundSize,
    swissCrossWhiteBackgroundSize,
    theme.cross.borderColor
  );
  renderRectFunction(
    size / 2 - swissCrossBlackBackgroundSize / 2,
    size / 2 - swissCrossBlackBackgroundSize / 2,
    swissCrossBlackBackgroundSize,
    swissCrossBlackBackgroundSize,
    theme.cross.bgColor
  );
  renderRectFunction(
    size / 2 - swissCrossLength / 2,
    size / 2 - swissCrossThickness / 2,
    swissCrossLength,
    swissCrossThickness,
    theme.cross.fillColor
  );
  renderRectFunction(
    size / 2 - swissCrossThickness / 2,
    size / 2 - swissCrossLength / 2,
    swissCrossThickness,
    swissCrossLength,
    theme.cross.fillColor
  );
}
export {
  generateQRData,
  renderQRCode,
  renderSwissCross
};
