const FreeDeal = require("./free-deal");
const catelogue = require("../../data/catelogue.js");

describe("FreeDeal", () => {
  describe("when buying 3 Apple TVs but pay 2", () => {
    const productName = "atv";
    const initialItemsCount = 3;
    const payableItemsCount = 2;
    const fd = new FreeDeal({
      productName,
      initialItemsCount,
      payableItemsCount,
    });
    const productPrice = catelogue[productName].price;

    it("should returns sum = 0 when 0 Apple TV is purchased", () => {
      const productNumber = { atv: 0 };
      const sum = productPrice * productNumber.atv;
      expect(fd.calculate({ sum, productNumber })).toEqual(0);
    });

    it("should returns sum = 109.5 when 1 Apple TV is purchased", () => {
      const productNumber = { atv: 1 };
      const sum = productPrice * productNumber.atv;
      expect(fd.calculate({ sum, productNumber })).toEqual(109.5);
    });

    it("should returns sum = 219 when 2 Apple TVs are purchased", () => {
      const productNumber = { atv: 3 };
      const sum = productPrice * productNumber.atv;
      expect(fd.calculate({ sum, productNumber })).toEqual(219);
    });

    it("should returns sum = 328.5 when 4 Apple TVs are purchased", () => {
      const productNumber = { atv: 4 };
      const sum = productPrice * productNumber.atv;
      expect(fd.calculate({ sum, productNumber })).toEqual(328.5);
    });
  });

  describe("when buying 4 Super iPads but pay 3", () => {
    const productName = "ipd";
    const initialItemsCount = 4;
    const payableItemsCount = 3;
    const fd = new FreeDeal({
      productName,
      initialItemsCount,
      payableItemsCount,
    });
    const productPrice = catelogue[productName].price;

    it("should returns sum = 0 when 0 Super iPad is purchased", () => {
      const productNumber = { ipd: 0 };
      const sum = productPrice * productNumber.ipd;
      expect(fd.calculate({ sum, productNumber })).toEqual(0);
    });

    it("should returns sum = 549.99 when 1 Super iPad is purchased", () => {
      const productNumber = { ipd: 1 };
      const sum = productPrice * productNumber.ipd;
      expect(fd.calculate({ sum, productNumber })).toEqual(549.99);
    });

    it("should returns sum = 1649.97 when 4 Super iPads are purchased", () => {
      const productNumber = { ipd: 4 };
      const sum = productPrice * productNumber.ipd;
      expect(fd.calculate({ sum, productNumber })).toEqual(1649.97);
    });
  });

  describe("should throw an error when", () => {
    describe("productName is undefined", () => {
      expect(() => {
        const productName = undefined;
        const initialItemsCount = 3;
        const payableItemsCount = 2;
        new FreeDeal({
          productName,
          initialItemsCount,
          payableItemsCount,
        });
      }).toThrow("productName must be a non empty string.");
    });

    describe("initialItemsCount and payableItemsCount are 0", () => {
      expect(() => {
        const productName = "atv";
        const initialItemsCount = 0;
        const payableItemsCount = 0;
        new FreeDeal({
          productName,
          initialItemsCount,
          payableItemsCount,
        });
      }).toThrow(
        "initialItemsCount and payableItemsCount must be positive intergers and initialItemsCount must be larger than payableItemsCount."
      );
    });

    describe("payableItemsCount is -1", () => {
      expect(() => {
        const productName = "atv";
        const initialItemsCount = 3;
        const payableItemsCount = -1;
        new FreeDeal({
          productName,
          initialItemsCount,
          payableItemsCount,
        });
      }).toThrow(
        "initialItemsCount and payableItemsCount must be positive intergers and initialItemsCount must be larger than payableItemsCount."
      );
    });

    describe("initialItemsCount is null and payableItemsCount is undefined", () => {
      expect(() => {
        const productName = "atv";
        const initialItemsCount = null;
        const payableItemsCount = undefined;
        new FreeDeal({
          productName,
          initialItemsCount,
          payableItemsCount,
        });
      }).toThrow(
        "initialItemsCount and payableItemsCount must be positive intergers and initialItemsCount must be larger than payableItemsCount."
      );
    });
  });
});
