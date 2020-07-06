const catelogue = require("../../data/catelogue.js");
const { isPositiveInteger, isNonNegativeNumber } = require("../validators");

module.exports = class BulkDiscount {
  constructor({ productName, dealItemsCount, discountPrice }) {
    const isValid =
      isPositiveInteger(dealItemsCount) && isNonNegativeNumber(discountPrice);

    if (!isValid) {
      throw "dealItemsCount must be an integer, discountPrice must be larger than 0!";
    } else {
      this.productName = productName;
      this.minItemsCount = dealItemsCount + 1;
      this.discountPrice = discountPrice;
    }
  }

  calculate({ sum, productNumber }) {
    const bulkProductNumber = productNumber[this.productName];
    const bulkProductPrice = catelogue[this.productName].price;
    if (bulkProductNumber >= this.minItemsCount) {
      sum = sum - (bulkProductPrice - this.discountPrice) * bulkProductNumber;
    }
    return sum;
  }
};
