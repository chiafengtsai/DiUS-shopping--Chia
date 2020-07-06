const FreeBundle = require("./free-bundle");
const catelogue = require("../../data/catelogue.js");

describe("FreeBundle", () => {
  describe("when a VGA adapter free of charge with every MacBook Pro sold", () => {
    const soldItem = "mbp";
    const freeItem = "vga";
    const priceSoldItem = catelogue[soldItem].price;
    const priceFreeItem = catelogue[freeItem].price;
    const fb = new FreeBundle({ soldItem, freeItem });
    it("should returns sum = 0 when purchasing 0 macbook and 0 adapter", () => {
      const productNumber = { mbp: 0, vga: 0 };
      const sum =
        priceSoldItem * productNumber[soldItem] +
        priceFreeItem * productNumber[freeItem];
      expect(fb.calculate({ sum, productNumber })).toEqual(0);
    });

    it("should returns sum = 1399.99 when purchasing 1 macbook and 1 adapter", () => {
      const productNumber = { mbp: 1, vga: 1 };
      const sum =
        priceSoldItem * productNumber[soldItem] +
        priceFreeItem * productNumber[freeItem];
      expect(fb.calculate({ sum, productNumber })).toEqual(1399.99);
    });

    it("should returns sum = 2799.98 when purchasing 2 macbooks and 1 adapter", () => {
      const productNumber = { mbp: 2, vga: 1 };
      const sum =
        priceSoldItem * productNumber[soldItem] +
        priceFreeItem * productNumber[freeItem];
      expect(fb.calculate({ sum, productNumber })).toEqual(2799.98);
    });

    it("should returns sum = 1429.99 when purchasing 1 macbooks and 2 adapters", () => {
      const productNumber = { mbp: 1, vga: 2 };
      const sum =
        priceSoldItem * productNumber[soldItem] +
        priceFreeItem * productNumber[freeItem];
      expect(fb.calculate({ sum, productNumber })).toEqual(1429.99);
    });
  });

  describe("when a atv free of charge with every Super iPad sold", () => {
    const soldItem = "ipd";
    const freeItem = "atv";
    const priceSoldItem = catelogue[soldItem].price;
    const priceFreeItem = catelogue[freeItem].price;
    const fb = new FreeBundle({ soldItem, freeItem });

    it("should returns sum = 0 when purchasing 0 iPads and 0 Apple TV", () => {
      const productNumber = { ipd: 0, atv: 0 };
      const sum =
        priceSoldItem * productNumber[soldItem] +
        priceFreeItem * productNumber[freeItem];
      expect(fb.calculate({ sum, productNumber })).toEqual(0);
    });

    it("should returns sum = 549.99 when purchasing 1 iPads and 1 Apple TV", () => {
      const productNumber = { ipd: 1, atv: 1 };
      const sum =
        priceSoldItem * productNumber[soldItem] +
        priceFreeItem * productNumber[freeItem];
      expect(fb.calculate({ sum, productNumber })).toEqual(549.99);
    });

    it("should returns sum = 1099.98 when purchasing 2 iPads and 1 Apple TV", () => {
      const productNumber = { ipd: 2, atv: 1 };
      const sum =
        priceSoldItem * productNumber[soldItem] +
        priceFreeItem * productNumber[freeItem];
      expect(fb.calculate({ sum, productNumber })).toEqual(1099.98);
    });

    it("should returns sum = 659.49 when purchasing 1 iPad and 2 Apple TVs", () => {
      const productNumber = { ipd: 1, atv: 2 };
      const sum =
        priceSoldItem * productNumber[soldItem] +
        priceFreeItem * productNumber[freeItem];
      expect(fb.calculate({ sum, productNumber })).toEqual(659.49);
    });
  });

  describe("should throw an error if called without a valid argument", () => {
    expect(() => {
      const soldItem = "";
      const freeItem = 0;
      new FreeBundle({ soldItem, freeItem });
    }).toThrow("soldItem and freeItem must be a non empty string.");

    expect(() => {
      const soldItem = undefined;
      const freeItem = null;
      new FreeBundle({ soldItem, freeItem });
    }).toThrow("soldItem and freeItem must be a non empty string.");
  });
});
