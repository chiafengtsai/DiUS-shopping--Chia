const catelogue = require("../../data/catelogue.js");
const { isPositiveInteger, isValidString } = require("../validators");

module.exports = class FreeDeal {
  constructor({ productName, initialItemsCount, payableItemsCount }) {
    const isValidProductName = isValidString(productName);
    const isValidItemCount =
      isPositiveInteger(initialItemsCount) &&
      isPositiveInteger(payableItemsCount) &&
      initialItemsCount > payableItemsCount;

    if (!isValidProductName) {
      throw "productName must be a non empty string.";
    } else if (!isValidItemCount) {
      throw "initialItemsCount and payableItemsCount must be positive intergers and initialItemsCount must be larger than payableItemsCount.";
    } else {
      this.productName = productName;
      this.initialItemsCount = initialItemsCount;
      this.payableItemsCount = payableItemsCount;
    }
  }
  calculate({ sum, productNumber }) {
    const freeDealProductNumber = productNumber[this.productName];
    const freeDealProductPrice = catelogue[this.productName].price;
    if (freeDealProductNumber >= this.initialItemsCount) {
      sum =
        sum -
        (this.initialItemsCount - this.payableItemsCount) *
          freeDealProductPrice *
          Math.floor(freeDealProductNumber / this.initialItemsCount);
    }
    return sum;
  }
};
