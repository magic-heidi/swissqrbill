
# Change Log

# [v3.0.1](https://github.com/schoero/swissqrbill/compare/v3.0.0...v3.0.1) - 14.10.2021
  * Changed build target to ES6 to support older Browsers and Node.js versions. [#347](https://github.com/schoero/SwissQRBill/pull/347)
  
# [v3.0.0](https://github.com/schoero/swissqrbill/compare/v2.4.2...v3.0.0) - 03.10.2021
  * New features
    * SVG
      * Added support for SVG rendering [#343](https://github.com/schoero/SwissQRBill/issues/343).
    * Added es6 module exports.
    * Support for tree shaking.
    * utils
      * Added `mm2px()` function.
      * Added `px2mm()` function.
      * Added `pt2mm()` function.
  * Breaking changes
    * imports
      * SwissQRBill is now available as a CommonJS and an ES module. This may change how the module has to be imported. Please take a look at the [importing the library](https://github.com/schoero/SwissQRBill#importing-the-library) section in the readme.
    * data
      * the field `houseNumber` has been renamed to `buildingNumber`.
      * the deprecated field `debitor` has been removed. Use `debtor` instead.
    * utils
      * `mmToPoints()` function has been renamed to `mm2pt()`.
    * PDF
      * Removed deprecated `mmToPoints()` export. Use `utils.mm2pt()` instead.
  * Fixes
    * PDF
      * The positioning of the box when no amount is provided has been slightly corrected.
      * The positioning iban on the payment part has been slightly corrected.
      * Fixed positioning of the debtor boxes when no debtor is provided and the creditor address break to multiple lines.
  

# [v2.4.2](https://github.com/schoero/swissqrbill/compare/v2.4.1...v2.4.2) - 26.08.2021
  * Fixed translation of `additionalInformation` and `payableByName`. [#342](https://github.com/schoero/SwissQRBill/pull/342)

# [v2.4.1](https://github.com/schoero/swissqrbill/compare/v2.4.0...v2.4.1) - 25.08.2021
  * Fixed missing rendering of `message`. [#340](https://github.com/schoero/SwissQRBill/pull/340)

# [v2.4.0](https://github.com/schoero/swissqrbill/compare/v2.3.3...v2.4.0) - 01.07.2021
  * Added an optional size parameter to specify the new page size in `addQRBill()`. [#338](https://github.com/schoero/SwissQRBill/pull/338)

# [v2.3.3](https://github.com/schoero/swissqrbill/compare/v2.3.1...v2.3.3) - 05.04.2021
  * A string is now allowed for the zip code field. [#294](https://github.com/schoero/SwissQRBill/pull/294)

# [v2.3.1](https://github.com/schoero/swissqrbill/compare/v2.3.0...v2.3.1) - 06.02.2021
  * Removed iban dependency and integrated IBAN validation directly into the library.
  * Fixed some misleading error messages.

# [v2.3.0](https://github.com/schoero/swissqrbill/compare/v2.2.0...v2.3.0) - 24.01.2021
  * Added [options](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md#options) to disable rendering of outlines, scissors icons or text `Separate before paying in`, for use with perforated or preprinted paper.

# [v2.2.0](https://github.com/schoero/swissqrbill/compare/v2.1.0...v2.2.0) - 20.01.2021
  * Switched from `fs.WriteStream` to `stream.Writable` in order to provide more streaming flexibility. [#207](https://github.com/schoero/SwissQRBill/pull/207)

# [v2.1.0](https://github.com/schoero/swissqrbill/compare/v2.0.3...v2.1.0) - 15.12.2020
  * Changed the implemented QR code library to fix an issue that caused QR code scanning to fail on some QR readers.
  * Added [utility functions](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md#swissqrbillutils) to simplify the creation of QR bills.
  * Added additional QR-Reference validation.

# [v2.0.3](https://github.com/schoero/swissqrbill/compare/v2.0.2...v2.0.3) - 09.12.2020
  * Fixed a problem with QR Code encoding that caused QR Code scanning to fail at certain banks.

# [v2.0.2](https://github.com/schoero/swissqrbill/compare/v2.0.1...v2.0.2) - 19.08.2020
  * Fixed an issue that caused reference to render incorrectly.
  * Fixed "Compte / Payable à" to display correctly in french QR bills.

# [v2.0.1](https://github.com/schoero/swissqrbill/compare/v2.0.0...v2.0.1) - 22.07.2020
  * Small bug fixes and code cleanup.

# [v2.0.0](https://github.com/schoero/swissqrbill/compare/v1.3.1...v2.0.0) - 12.07.2020
  * Added browser support.
    - Added new blobStream method.
  * Added possibility to stream the pdf into a buffer.

# [v1.3.1](https://github.com/schoero/swissqrbill/compare/v1.3.0...v1.3.1) - 27.06.2020
  * Fixed invalid QR Code field when the second decimal place in amount is a zero.

# [v1.3.0](https://github.com/schoero/swissqrbill/compare/v1.2.0...v1.3.0) - 25.06.2020
  * Tables
    - Added new header property on table rows to automatically insert a header row on new pages.
    - Table row height is now automatically calculated if not otherwise defined.
    - Added padding property to rows and cells.
  * Events
    - Added new beforeEnd event that could be used to add page numbers.
    - Added new pageAdded event that could be used to add a header to the pages.
  * Renamed `debitor` property to `debtor`.
  * Improved documentation.
  * TypeScript declaration improvements.
  * Fixed typos in examples.

# [v1.2.0](https://github.com/schoero/swissqrbill/compare/v1.1.0...v1.2.0) - 06.06.2020
  * Added optional callback function that gets executed once the pdf file has completed writing.
  * Emit finish event once the pdf file has completed writing.

# [v1.1.0](https://github.com/schoero/swissqrbill/compare/v1.0.6...v1.1.0) - 15.03.2020
  * Fixed some validation checks.
  * Improved error messages.
  * Added new method to generate tables.
  * Improved documentation.

# [v1.0.6](https://github.com/schoero/swissqrbill/compare/v1.0.5...v1.0.6) - 04.03.2020
  * Fixed QR Code fields.
  * Added user data validation.

# [v1.0.5](https://github.com/schoero/swissqrbill/compare/v1.0.4...v1.0.5) - 03.03.2020
  * Fixed french characters.
  * Removes new lines in userdata.
  * Fixed some layout issues.