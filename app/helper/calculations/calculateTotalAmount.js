const calculateSubTotalAmount = require("./calculateSubTotalAmount");
const calculateTaxAmount = require("./calculateTaxAmount");

const calculateTotalAmount = (items, tax) => {
    return calculateSubTotalAmount(items) + calculateTaxAmount(items, tax);
};

module.exports = calculateTotalAmount;