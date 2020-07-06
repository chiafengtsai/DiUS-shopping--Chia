const catelogue = require("./data/catelogue");

class Checkout {
  constructor(rules) {
    this.rules = rules;
    this.checkoutItems = [];
    this.productNumber = {};
    this.sum = 0;
  }
  scan(item) {
    if (!catelogue[item]) {
      throw `${item} doesn't exist in catalogue`;
    } else {
      this.productNumber[item] = this.productNumber[item]
        ? this.productNumber[item] + 1
        : 1;
      this.checkoutItems.push(item);
    }
  }
  total() {
    this.checkoutItems.map((item) => {
      const { price: itemPrice } = catelogue[item];
      this.sum = this.sum + itemPrice;
    });

    if (this.rules && this.rules.length > 0) {
      this.rules.map((rule) => {
        const { sum, productNumber } = this;
        if (rule.calculate !== undefined) {
          this.sum = rule.calculate({ sum, productNumber });
        } else {
          throw `Passed rule does't have calculate function`;
        }
      });
    }

    return this.sum;
  }
}

module.exports = Checkout;
