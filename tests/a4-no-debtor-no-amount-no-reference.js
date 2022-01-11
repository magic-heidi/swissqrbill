const SwissQRBill = require("../");

const data = {
  currency: "CHF",
  creditor: {
    name: "Robert Schneider",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Zug",
    account: "CH5800791123000889012",
    country: "CH"
  }
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/a4-no-debtor-no-amount-no-reference.pdf", { size: "A4" });