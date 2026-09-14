"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
class QRTheme {
  /**
   * Resolves a partial theme to the colors used by the QR code renderers.
   *
   * @param theme Partial theme to resolve.
   * @returns Resolved theme.
   */
  static resolve(theme) {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
      cross: {
        bgColor: (_b = (_a = theme == null ? void 0 : theme.cross) == null ? void 0 : _a.bgColor) != null ? _b : "black",
        borderColor: (_d = (_c = theme == null ? void 0 : theme.cross) == null ? void 0 : _c.borderColor) != null ? _d : "white",
        fillColor: (_f = (_e = theme == null ? void 0 : theme.cross) == null ? void 0 : _e.fillColor) != null ? _f : "white"
      },
      moduleColor: (_g = theme == null ? void 0 : theme.moduleColor) != null ? _g : "black"
    };
  }
}
exports.QRTheme = QRTheme;
