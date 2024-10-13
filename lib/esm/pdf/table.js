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
var TableLayer = /* @__PURE__ */ ((TableLayer2) => {
  TableLayer2[TableLayer2["HeightCalculation"] = 0] = "HeightCalculation";
  TableLayer2[TableLayer2["PageInjection"] = 1] = "PageInjection";
  TableLayer2[TableLayer2["BackgroundColor"] = 2] = "BackgroundColor";
  TableLayer2[TableLayer2["Borders"] = 3] = "Borders";
  TableLayer2[TableLayer2["Text"] = 4] = "Text";
  return TableLayer2;
})(TableLayer || {});
class Table {
  /**
   * Creates a new Table instance.
   *
   * @param data The rows and columns for the table.
   * @returns The Table instance.
   */
  constructor(data) {
    this.data = data;
  }
  // Hacky workaround to get the current page of the document
  getCurrentPage(doc) {
    const page = doc.page;
    for (let i = doc.bufferedPageRange().start; i < doc.bufferedPageRange().count; i++) {
      doc.switchToPage(i);
      if (doc.page === page) {
        return i;
      }
    }
    return doc.bufferedPageRange().count;
  }
  /**
   * Attaches the table to a PDFKit document instance beginning on the current page. It will create a new page with for
   * every row that no longer fits on a page.
   *
   * @param doc The PDFKit document instance.
   * @param x The horizontal position in points where the table be placed.
   * @param y The vertical position in points where the table will be placed.
   * @throws { Error } Throws an error if no table rows are provided.
   */
  attachTo(doc, x = ((_a) => (_a = doc.x) != null ? _a : 0)(), y = ((_b) => (_b = doc.y) != null ? _b : 0)()) {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    if (this.data.rows === void 0) {
      throw new Error("No table rows provided.");
    }
    if (!doc.page) {
      doc.addPage({ size: "A4" });
    }
    doc.options.bufferPages = true;
    const tableX = x;
    const tableY = y;
    const startPage = this.getCurrentPage(doc);
    const tableWidth = this.data.width ? this.data.width : doc.page.width - tableX - doc.page.margins.right;
    const tableBackgroundColor = this.data.backgroundColor ? this.data.backgroundColor : void 0;
    const tableBorder = this.data.borderWidth ? this.data.borderWidth : void 0;
    const tableBorderColors = this.data.borderColor ? this.data.borderColor : "#000000";
    const tablePadding = this.data.padding ? this.data.padding : 0;
    const tableFontSize = this.data.fontSize ? this.data.fontSize : 11;
    const tableTextColor = this.data.textColor ? this.data.textColor : "#000000";
    const tableFont = this.data.fontName ? this.data.fontName : "Helvetica";
    const tableAlign = this.data.align ? this.data.align : void 0;
    const tableVerticalAlign = this.data.verticalAlign ? this.data.verticalAlign : "top";
    const headerRowIndex = this.data.rows.findIndex((row) => !!row.header);
    const autoRowHeights = [];
    for (let layer = 0; layer < Object.values(TableLayer).length / 2; layer++) {
      doc.switchToPage(startPage);
      let rowY = tableY;
      rowLoop: for (let rowIndex = 0; rowIndex < this.data.rows.length; rowIndex++) {
        const row = this.data.rows[rowIndex];
        const rowHeight = autoRowHeights[rowIndex];
        const minRowHeight = row.minHeight;
        const maxRowHeight = row.maxHeight;
        const rowPadding = row.padding ? row.padding : tablePadding;
        const rowBackgroundColor = row.backgroundColor ? row.backgroundColor : tableBackgroundColor;
        const rowBorder = row.borderWidth ? row.borderWidth : tableBorder;
        const rowBorderColors = row.borderColor ? row.borderColor : tableBorderColors;
        const rowFontSize = row.fontSize ? row.fontSize : tableFontSize;
        const rowFont = row.fontName ? row.fontName : tableFont;
        const rowTextColor = row.textColor ? row.textColor : tableTextColor;
        const rowAlign = row.align ? row.align : tableAlign;
        const rowVerticalAlign = row.verticalAlign ? row.verticalAlign : tableVerticalAlign;
        doc.moveTo(tableX, tableY);
        let columnX = tableX;
        columnLoop: for (let columnIndex = 0; columnIndex < row.columns.length; columnIndex++) {
          const column = row.columns[columnIndex];
          const { remainingColumns, widthUsed } = row.columns.reduce((acc, column2) => {
            if (column2.width !== void 0) {
              acc.widthUsed += column2.width;
              acc.remainingColumns--;
            }
            return acc;
          }, { remainingColumns: row.columns.length, widthUsed: 0 });
          const columnWidth = column.width ? column.width : (tableWidth - widthUsed) / remainingColumns;
          const columnPadding = column.padding ? column.padding : rowPadding;
          const columnBackgroundColor = column.backgroundColor ? column.backgroundColor : rowBackgroundColor;
          const columnBorder = column.borderWidth ? column.borderWidth : rowBorder;
          const columnBorderColors = column.borderColor ? column.borderColor : rowBorderColors;
          const columnFontSize = column.fontSize ? column.fontSize : rowFontSize;
          const columnFont = column.fontName ? column.fontName : rowFont;
          const columnTextColor = column.textColor ? column.textColor : rowTextColor;
          const columnAlign = column.align ? column.align : rowAlign;
          const columnVerticalAlign = column.verticalAlign ? column.verticalAlign : rowVerticalAlign;
          const fillOpacity = columnBackgroundColor === void 0 ? 0 : 1;
          const borderOpacity = columnBorderColors === void 0 ? 0 : 1;
          const paddings = this._positionsToObject(columnPadding);
          doc.moveTo(columnX + columnWidth, rowY);
          const textOptions = __spreadProps(__spreadValues({}, (_a2 = column.textOptions) != null ? _a2 : {}), {
            align: columnAlign,
            baseline: "middle",
            height: rowHeight !== void 0 ? rowHeight - ((_b2 = paddings.top) != null ? _b2 : 0) - ((_c = paddings.bottom) != null ? _c : 0) : void 0,
            lineBreak: true,
            width: columnWidth - ((_d = paddings.left) != null ? _d : 0) - ((_e = paddings.right) != null ? _e : 0)
          });
          doc.font(columnFont);
          doc.fontSize(columnFontSize);
          const textHeight = doc.heightOfString(`${column.text}`, textOptions);
          const singleLineHeight = doc.heightOfString("A", textOptions);
          if (layer === 0) {
            if (autoRowHeights[rowIndex] === void 0 || autoRowHeights[rowIndex] < textHeight + ((_f = paddings.top) != null ? _f : 0) + ((_g = paddings.bottom) != null ? _g : 0)) {
              autoRowHeights[rowIndex] = textHeight + ((_h = paddings.top) != null ? _h : 0) + ((_i = paddings.bottom) != null ? _i : 0);
              if (minRowHeight !== void 0 && autoRowHeights[rowIndex] < minRowHeight) {
                autoRowHeights[rowIndex] = minRowHeight;
              }
              if (maxRowHeight !== void 0 && autoRowHeights[rowIndex] > maxRowHeight) {
                autoRowHeights[rowIndex] = maxRowHeight;
              }
            }
            if (row.height !== void 0) {
              autoRowHeights[rowIndex] = row.height;
            }
            if (columnIndex < row.columns.length - 1) {
              continue columnLoop;
            } else {
              continue rowLoop;
            }
          }
          if (layer === 1) {
            if (rowY + rowHeight >= doc.page.height - doc.page.margins.bottom) {
              doc.addPage();
              rowY = doc.y;
              const headerRow = this.data.rows[headerRowIndex];
              if (headerRow !== void 0) {
                this.data.rows.splice(rowIndex, 0, headerRow);
                autoRowHeights.splice(rowIndex, 0, autoRowHeights[headerRowIndex]);
                rowIndex--;
                continue rowLoop;
              }
            }
          }
          if (layer > 1) {
            if (!!row.header && rowY !== ((_j = doc.page.margins.top) != null ? _j : 0) && rowIndex !== headerRowIndex || rowY + rowHeight >= doc.page.height - doc.page.margins.bottom) {
              doc.switchToPage(this.getCurrentPage(doc) + 1);
              doc.x = tableX;
              doc.y = (_k = doc.page.margins.top) != null ? _k : 0;
              rowY = doc.y;
            }
          }
          if (layer === 2) {
            if (columnBackgroundColor !== void 0) {
              doc.rect(columnX, rowY, columnWidth, rowHeight).fillColor(columnBackgroundColor).fillOpacity(fillOpacity).fill();
            }
          }
          if (layer === 4) {
            let textPosY = rowY;
            if (columnVerticalAlign === "top") {
              textPosY = rowY + ((_l = paddings.top) != null ? _l : 0) + singleLineHeight / 2;
            } else if (columnVerticalAlign === "center") {
              textPosY = rowY + rowHeight / 2 - textHeight / 2 + singleLineHeight / 2;
            } else if (columnVerticalAlign === "bottom") {
              textPosY = rowY + rowHeight - ((_m = paddings.bottom) != null ? _m : 0) - textHeight + singleLineHeight / 2;
            }
            if (textPosY < rowY + ((_n = paddings.top) != null ? _n : 0) + singleLineHeight / 2) {
              textPosY = rowY + ((_o = paddings.top) != null ? _o : 0) + singleLineHeight / 2;
            }
            doc.fillColor(columnTextColor).fillOpacity(1);
            doc.text(`${column.text}`, columnX + ((_p = paddings.left) != null ? _p : 0), textPosY, textOptions);
          }
          if (layer === 3) {
            if (columnBorder !== void 0 && columnBorderColors !== void 0) {
              const border = this._positionsToObject(columnBorder);
              const borderColor = this._positionsToObject(columnBorderColors);
              doc.undash().lineJoin("miter").lineCap("butt").strokeOpacity(borderOpacity);
              if (border.left && borderColor.left) {
                const borderBottomMargin = border.bottom ? border.bottom / 2 : 0;
                const borderTopMargin = border.top ? border.top / 2 : 0;
                doc.moveTo(columnX, rowY + rowHeight + borderBottomMargin);
                doc.lineTo(columnX, rowY - borderTopMargin).strokeColor(borderColor.left).lineWidth(border.left).stroke();
              }
              if (border.right && borderColor.right) {
                const borderTopMargin = border.top ? border.top / 2 : 0;
                const borderBottomMargin = border.bottom ? border.bottom / 2 : 0;
                doc.moveTo(columnX + columnWidth, rowY - borderTopMargin);
                doc.lineTo(columnX + columnWidth, rowY + rowHeight + borderBottomMargin).strokeColor(borderColor.right).lineWidth(border.right).stroke();
              }
              if (border.top && borderColor.top) {
                const borderLeftMargin = border.left ? border.left / 2 : 0;
                const borderRightMargin = border.right ? border.right / 2 : 0;
                doc.moveTo(columnX - borderLeftMargin, rowY);
                doc.lineTo(columnX + columnWidth + borderRightMargin, rowY).strokeColor(borderColor.top).lineWidth(border.top).stroke();
              }
              if (border.bottom && borderColor.bottom) {
                const borderRightMargin = border.right ? border.right / 2 : 0;
                const borderLeftMargin = border.left ? border.left / 2 : 0;
                doc.moveTo(columnX + columnWidth + borderRightMargin, rowY + rowHeight);
                doc.lineTo(columnX - borderLeftMargin, rowY + rowHeight).strokeColor(borderColor.bottom).lineWidth(border.bottom).stroke();
              }
            }
          }
          columnX += columnWidth;
        }
        rowY += rowHeight;
        doc.x = columnX;
        doc.y = rowY;
      }
    }
    doc.x = tableX;
  }
  _positionsToObject(numberOrPositions) {
    if (typeof numberOrPositions === "number" || typeof numberOrPositions === "string") {
      return {
        bottom: numberOrPositions,
        left: numberOrPositions,
        right: numberOrPositions,
        top: numberOrPositions
      };
    } else {
      return {
        bottom: numberOrPositions[2] !== void 0 ? numberOrPositions[2] : numberOrPositions[0],
        left: numberOrPositions[3] !== void 0 ? numberOrPositions[3] : numberOrPositions[1],
        right: numberOrPositions[1] !== void 0 ? numberOrPositions[1] : void 0,
        top: numberOrPositions[0]
      };
    }
  }
}
export {
  Table
};
