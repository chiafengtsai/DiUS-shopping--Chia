const catelogue = require("./data/catelogue");
const { FreeDeal, BulkDiscount, FreeBundle } = require("./utils/pricingRules");

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

const freeDeal = new FreeDeal({
  productName: "atv",
  initialItemsCount: 3,
  payableItemsCount: 2,
});
const bulkDiscount = new BulkDiscount({
  productName: "ipd",
  dealItemsCount: 4,
  discountPrice: 499.99,
});
const freeBundle = new FreeBundle({
  soldItem: "mbp",
  freeItem: "vga",
});

const activePromos = [freeDeal, bulkDiscount, freeBundle];

function scenarioOne() {
  const checkOut = new Checkout(activePromos);
  const cartItems = ["atv", "ipd", "ipd", "atv", "ipd", "ipd", "ipd"];
  cartItems.map((item) => {
    checkOut.scan(item);
  });
  const total = checkOut.total();
  console.log(
    `====> Scenario 1: SKUs Scanned: ${cartItems.toString()} Total expected: $${total}`
  );
}

function scenarioTwo() {
  const checkOut = new Checkout(activePromos);
  const cartItems = ["atv", "atv", "atv", "vga"];
  cartItems.map((item) => {
    checkOut.scan(item);
  });
  const total = checkOut.total();
  console.log(
    `====> Scenario 2: SKUs Scanned: ${cartItems.toString()} Total expected: $${total}`
  );
}

function scenarioThree() {
  const checkOut = new Checkout(activePromos);
  const cartItems = ["mbp", "vga", "ipd"];
  cartItems.map((item) => {
    checkOut.scan(item);
  });
  const total = checkOut.total();
  console.log(
    `====> Scenario 3: SKUs Scanned: ${cartItems.toString()} Total expected: $${total}`
  );
}

scenarioOne();
scenarioTwo();
scenarioThree();
