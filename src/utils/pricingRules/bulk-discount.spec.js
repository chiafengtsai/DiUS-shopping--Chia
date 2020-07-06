const BulkDiscount = require("./bulk-discount");
const catelogue = require("../../data/catelogue.js");

describe("BulkDiscount", () => {
  describe("iPad price will drop to $499.99 each if it's purchased more than 4", () => {
    const productName = "ipd";
    const dealItemsCount = 4;
    const discountPrice = 499.99;
    const productPrice = catelogue[productName].price;
    const bd = new BulkDiscount({ productName, dealItemsCount, discountPrice });

    it("should returns sum = 0 when no iPad is purchased.", () => {
      const productNumber = { ipd: 0 };
      const sum = productPrice * productNumber.ipd;
      expect(bd.calculate({ sum, productNumber })).toEqual(0);
    });

    it("should returns sum = 549.99 when 1 iPad is purchased.", () => {
      const productNumber = { ipd: 1 };
      const sum = productPrice * productNumber.ipd;
      expect(bd.calculate({ sum, productNumber })).toEqual(549.99);
    });

    it("should returns sum = 2499.95 when 5 iPad is purchased.", () => {
      const productNumber = { ipd: 5 };
      const sum = productPrice * productNumber.ipd;
      expect(bd.calculate({ sum, productNumber })).toEqual(2499.95);
    });
  });

  describe("MacBook Pro price will drop to $1099.99 each if it's purchased more than 8", () => {
    const productName = "mbp";
    const dealItemsCount = 8;
    const discountPrice = 1099.99;
    const productPrice = catelogue[productName].price;
    const bd = new BulkDiscount({ productName, dealItemsCount, discountPrice });

    it("should return sum = 0 when no MacBook is purchased", () => {
      const productNumber = { mbp: 0 };
      const sum = productPrice * productNumber.mbp;
      expect(bd.calculate({ sum, productNumber })).toEqual(0);
    });

    it("should returns sum = 1399.99 when 1 MacBook is purchased", () => {
      const productNumber = { mbp: 1 };
      const sum = productPrice * productNumber.mbp;
      expect(bd.calculate({ sum, productNumber })).toEqual(1399.99);
    });

    it("should returns sum = 9899.91 when 9 MacBook is purchased", () => {
      const productNumber = { mbp: 9 };
      const sum = productPrice * productNumber.mbp;
      expect(bd.calculate({ sum, productNumber })).toEqual(9899.91);
    });
  });

  describe("should throw an error if called without a valid argument", () => {
    expect(() => {
      const productName = "mbp";
      const dealItemsCount = 0;
      const discountPrice = -1;
      new BulkDiscount({ productName, dealItemsCount, discountPrice });
    }).toThrow(
      "dealItemsCount must be an integer, discountPrice must be larger than 0!"
    );

    expect(() => {
      const productName = "mbp";
      const dealItemsCount = null;
      const discountPrice = undefined;
      new BulkDiscount({ productName, dealItemsCount, discountPrice });
    }).toThrow(
      "dealItemsCount must be an integer, discountPrice must be larger than 0!"
    );
  });
});
