const catelogue = require("../../data/catelogue.js");
const { isValidString } = require("../validators");

module.exports = class FreeBundle {
  constructor({ soldItem, freeItem }) {
    const isValid = isValidString(soldItem) && isValidString(freeItem);
    if (!isValid) {
      throw "soldItem and freeItem must be a non empty string.";
    } else {
      this.soldItem = soldItem;
      this.freeItem = freeItem;
    }
  }

  calculate({ sum, productNumber }) {
    const soldItemProductNumber = productNumber[this.soldItem];
    const freeItemProductNumber = productNumber[this.freeItem];
    const freeItemPrice = catelogue[this.freeItem].price;

    if (soldItemProductNumber > 0) {
      let validNumberOfFreeItem = 0;
      if (freeItemProductNumber > 0) {
        validNumberOfFreeItem =
          soldItemProductNumber > freeItemProductNumber
            ? freeItemProductNumber
            : soldItemProductNumber;
      }
      sum = sum - freeItemPrice * validNumberOfFreeItem;
    }
    return sum;
  }
};
