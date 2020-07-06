const { FreeDeal, BulkDiscount, FreeBundle } = require("./utils/pricingRules");
const Checkout = require("./checkout");

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
