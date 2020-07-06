const {
  isPositiveInteger,
  isValidString,
  isNonNegativeNumber,
} = require("./validators");

describe("The isPositiveInteger validator", () => {
  it("should return false when number is not a integer", () => {
    const number = 1.234;
    expect(isPositiveInteger(number)).toEqual(false);
  });

  it("should return false when number is negative number", () => {
    const number = -1;
    expect(isPositiveInteger(number)).toEqual(false);
  });
  it("should return false when number is zero", () => {
    const number = 0;
    expect(isPositiveInteger(number)).toEqual(false);
  });

  it("should return true when number is positive integer", () => {
    const number = 1;
    expect(isPositiveInteger(number)).toEqual(true);
  });

  it("should return false when number is undefined ", () => {
    const number = undefined;
    expect(isPositiveInteger(number)).toEqual(false);
  });

  it("should return false when number is null ", () => {
    const number = null;
    expect(isPositiveInteger(number)).toEqual(false);
  });
});

describe("The isValidString validator", () => {
  it("should return false when value type is not string", () => {
    const value = 1.234;
    expect(isValidString(value)).toEqual(false);
  });

  it("should return false when value type is empty string", () => {
    const value = "";
    expect(isValidString(value)).toEqual(false);
  });

  it("should return false when value type is undefined", () => {
    const value = undefined;
    expect(isValidString(value)).toEqual(false);
  });

  it("should return false when value type is null", () => {
    const value = null;
    expect(isValidString(value)).toEqual(false);
  });

  it("should return true when value type is a non empty string", () => {
    const value = "string";
    expect(isValidString(value)).toEqual(true);
  });
});

describe("The isNonNegativeNumber validator", () => {
  it("should return false when value type is not number", () => {
    const value = "1.234";
    expect(isNonNegativeNumber(value)).toEqual(false);
  });

  it("should return false when value is negative", () => {
    const value = -1.234;
    expect(isNonNegativeNumber(value)).toEqual(false);
  });

  it("should return false when value type is undefined", () => {
    const value = undefined;
    expect(isNonNegativeNumber(value)).toEqual(false);
  });

  it("should return false when value type is null", () => {
    const value = null;
    expect(isNonNegativeNumber(value)).toEqual(false);
  });

  it("should return true when value type is zero", () => {
    const value = 0;
    expect(isNonNegativeNumber(value)).toEqual(true);
  });
});
