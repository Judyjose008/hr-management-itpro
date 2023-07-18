const calculateSubTotalAmount = (items) => {
    return  items.reduce( (total, item) => { return total + item.menu_item.price * item.quantity}, 0);
}

module.exports = calculateSubTotalAmount;