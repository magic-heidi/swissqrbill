import { describe, expect, it, test } from "vitest";

import { SwissQRCode } from "swissqrbill:pdf";
import { minimalRequiredWithAlternativeScheme1and2 } from "swissqrbill:tests:data/valid-data.js";
import { TestDocument } from "swissqrbill:tests:utils/pdf.js";
import { mm2pt } from "swissqrbill:utils";


describe("swissqrcode", () => {

  test("default sized swiss qr code", async () => {

    const name = "swissqrcode/default.pdf";
    const pdf = new TestDocument(name, { size: [mm2pt(200), mm2pt(200)] });
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2);

    qrCode.attachTo(pdf, mm2pt(77), mm2pt(77));

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();

  });

  test("larger sized swiss qr code", async () => {

    const name = "swissqrcode/large.pdf";
    const pdf = new TestDocument(name, { size: [mm2pt(200), mm2pt(200)] });
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2, 100);

    qrCode.attachTo(pdf, mm2pt(50), mm2pt(50));

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();

  });

  test("smaller sized swiss qr code", async () => {

    const name = "swissqrcode/small.pdf";
    const pdf = new TestDocument(name, { size: [mm2pt(200), mm2pt(200)] });
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2, 25);

    qrCode.attachTo(pdf, mm2pt(87.5), mm2pt(87.5));

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();

  });

  it("should place the swiss qr code at the current position by default", async () => {

    const name = "swissqrcode/current-position.pdf";
    const pdf = new TestDocument(name, { size: [mm2pt(200), mm2pt(200)] });
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2);

    qrCode.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();

  });

  it("applies a partial theme", () => {

    const colors: string[] = [];
    const document = {
      fill: () => document,
      fillColor: (color: string) => {
        colors.push(color);
        return document;
      },
      rect: () => document,
      restore: () => document,
      save: () => document,
      translate: () => document,
      x: 0,
      y: 0
    };
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2, 46, {
      cross: { bgColor: "#654321" },
      moduleColor: "#123456"
    });

    qrCode.attachTo(document as unknown as PDFKit.PDFDocument);

    expect(colors).toContain("#123456");
    expect(colors).toContain("#654321");
    expect(colors).toContain("white");

  });

});
