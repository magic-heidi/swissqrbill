# SwissQRBill

This fork adds features used by the Magic Heidi app.

## Installation

Install the fork directly from GitHub with pnpm:

```sh
pnpm add github:magic-heidi/swissqrbill#main
```

## Fork features

### QR-code theming

Customize the QR-code modules and Swiss cross colors by passing `qrTheme` in the `SwissQRBill` options. Unspecified colors retain the standard black-and-white appearance.

```ts
const qrBill = new SwissQRBill(data, {
  qrTheme: {
    moduleColor: "#1D4ED8",
    cross: { bgColor: "#1D4ED8" }
  }
});
```

Use a dark module color on a light background to keep the code reliably scannable.

### USD and GBP currency support

Set `data.currency` to `"USD"` or `"GBP"` when generating a bill. This support is temporary and will be removed soon.

```ts
data.currency = "USD";
```

## Usage and documentation

For installation, basic usage, and the complete API, see the [official SwissQRBill documentation](https://github.com/schoero/swissqrbill/tree/main/docs).
