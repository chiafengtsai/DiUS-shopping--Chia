const Checkout = require("./app");
const catelogue = require("./data/catelogue.js");
const { FreeDeal } = require("./utils/pricingRules");

describe("Checkout", () => {
  it("should throw error when item doesn't exist in catalogue", () => {
    const rules = ["rule1", "rule2"];
    const co = new Checkout(rules);
    expect(() => {
      const product = "random";
      co.scan(product);
    }).toThrow("random doesn't exist in catalogue");
  });

  it("should update inner state properly and output correct sum when passing valid product", () => {
    const freeDeal = new FreeDeal({
      productName: "atv",
      initialItemsCount: 3,
      payableItemsCount: 2,
    });
    const activePromos = [freeDeal];
    const co = new Checkout(activePromos);
    const product = "vga";
    co.scan(product);
    expect(co.productNumber[product]).toEqual(1);
    expect(co.checkoutItems).toEqual(["vga"]);
    expect(co.rules).toEqual(activePromos);
    expect(co.sum).toEqual(0);
    expect(co.total()).toEqual(30);
  });

  it("should throw error when passing invalid rules", () => {
    const rules = ["rule"];
    const co = new Checkout(rules);
    const product = "vga";
    co.scan(product);
    expect(() => {
      co.total();
    }).toThrow(`Passed rule does't have calculate function`);
  });

  it("should not apply any rule when value of rules is null or non iterable", () => {
    const rules = null;
    const co = new Checkout(rules);
    const product = "vga";
    co.scan(product);
    expect(co.total()).toEqual(30);
  });
});
