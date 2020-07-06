function isPositiveInteger(number) {
  return Math.sign(number) > 0 && Number.isInteger(number);
}

function isNonNegativeNumber(number) {
  return Math.sign(number) >= 0 && typeof number === "number";
}

function isValidString(value) {
  return typeof value === "string" && value !== "";
}

module.exports = {
  isPositiveInteger,
  isNonNegativeNumber,
  isValidString,
};
