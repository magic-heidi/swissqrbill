export interface PDFTable {
    /** Table rows. */
    rows: PDFRow[];
    /** Horizontal alignment of texts inside the table. */
    align?: "center" | "left" | "right";
    /** Background color of the table. */
    backgroundColor?: string;
    /** The colors of the border. */
    borderColor?: PDFBorderColor;
    /** Width of the borders of the row. */
    borderWidth?: PDFBorderWidth;
    /** Font of the text inside the table. */
    fontName?: string;
    /** Font size of the text inside the table. */
    fontSize?: number;
    /** Cell padding of the table cells. */
    padding?: PDFPadding;
    /** Text color of texts inside table. */
    textColor?: string;
    /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
    textOptions?: PDFKit.Mixins.TextOptions;
    /** Vertical alignment of texts inside the table. */
    verticalAlign?: "bottom" | "center" | "top";
    /** Width of whole table. */
    width?: number;
}
export interface PDFRow {
    /** Table columns. */
    columns: PDFColumn[];
    /** Horizontal alignment of texts inside the row. */
    align?: "center" | "left" | "right";
    /** Background color of the row. */
    backgroundColor?: string;
    /** The colors of the border. */
    borderColor?: PDFBorderColor;
    /** Width of the borders of the row. */
    borderWidth?: PDFBorderWidth;
    /** Font of the text inside the row. */
    fontName?: string;
    /** Font size of the text inside the row. */
    fontSize?: number;
    /** A header row gets inserted automatically on new pages. Only one header row is allowed. */
    header?: boolean;
    /** Height of the row. Overrides minHeight and maxHeight. */
    height?: number;
    /** Maximum height of the row. */
    maxHeight?: number;
    /** Minimum height of the row. */
    minHeight?: number;
    /** Cell padding of the table cells inside the row. */
    padding?: PDFPadding;
    /** Text color of texts inside the row. */
    textColor?: string;
    /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
    textOptions?: PDFKit.Mixins.TextOptions;
    /** Vertical alignment of texts inside the row. */
    verticalAlign?: "bottom" | "center" | "top";
}
export interface PDFColumn {
    /** Cell text. */
    text: boolean | number | string;
    /** Horizontal alignment of the text inside the cell. */
    align?: "center" | "left" | "right";
    /** Background color of the cell. */
    backgroundColor?: string;
    /** The colors of the border. */
    borderColor?: PDFBorderColor;
    /** Width of the borders of the row. */
    borderWidth?: PDFBorderWidth;
    /** Font of the text inside the cell. */
    fontName?: string;
    /** Font size of the text inside the cell. */
    fontSize?: number;
    /** Cell padding of the table cell. */
    padding?: PDFPadding;
    /** Text color of texts inside the cell. */
    textColor?: string;
    /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
    textOptions?: PDFKit.Mixins.TextOptions;
    /** Vertical alignment of the text inside the cell. */
    verticalAlign?: "bottom" | "center" | "top";
    /** Width of the cell. */
    width?: number;
}
/** Can be used to set the color of the border of a table, row or column. */
export type PDFBorderColor = string | [top?: string, right?: string, bottom?: string, left?: string] | [vertical?: string, horizontal?: string];
/** Can be used to set the width of the border of a table, row or column. */
export type PDFBorderWidth = number | [top?: number, right?: number, bottom?: number, left?: number] | [vertical?: number, horizontal?: number];
/** Can be used to set the padding of a table cell. */
export type PDFPadding = number | [top?: number, right?: number, bottom?: number, left?: number] | [vertical?: number, horizontal?: number];
/**
 * The Table class is used to create tables for PDFKit documents. A table can be attached to any PDFKit document instance
 * using the {@link Table.attachTo} method.
 *
 * @example
 * ```ts
 * const tableData = {
 *   rows: [
 *     {
 *       backgroundColor: "#ECF0F1",
 *       columns: [
 *         {
 *           text: "Row 1 cell 1"
 *         }, {
 *           text: "Row 1 cell 2"
 *         }, {
 *           text: "Row 1 cell 3"
 *         }
 *       ]
 *     }, {
 *       columns: [
 *         {
 *           text: "Row 2 cell 1"
 *         }, {
 *           text: "Row 2 cell 2"
 *         }, {
 *           text: "Row 2 cell 3"
 *         }
 *       ]
 *     }
 *   ]
 * };
 * const pdf = new PDFDocument();
 * const table = new Table(tableData);
 *
 * const stream = createWriteStream("table.pdf");
 *
 * table.attachTo(pdf);
 * pdf.pipe(stream);
 * pdf.end();
 * ```
 */
export declare class Table {
    private data;
    /**
     * Creates a new Table instance.
     *
     * @param data The rows and columns for the table.
     * @returns The Table instance.
     */
    constructor(data: PDFTable);
    private getCurrentPage;
    /**
     * Attaches the table to a PDFKit document instance beginning on the current page. It will create a new page with for
     * every row that no longer fits on a page.
     *
     * @param doc The PDFKit document instance.
     * @param x The horizontal position in points where the table be placed.
     * @param y The vertical position in points where the table will be placed.
     * @throws { Error } Throws an error if no table rows are provided.
     */
    attachTo(doc: PDFKit.PDFDocument, x?: number, y?: number): void;
    private _positionsToObject;
}
