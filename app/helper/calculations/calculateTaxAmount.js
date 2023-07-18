const calculateSubTotalAmount = require("./calculateSubTotalAmount");

const calculateTaxAmount = (items, tax) => {
    return (calculateSubTotalAmount(items) * tax) / 100;
}

module.exports = calculateTaxAmount;