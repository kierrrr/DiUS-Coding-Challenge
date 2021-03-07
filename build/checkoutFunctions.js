"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.checkoutTotal = exports.scanProduct = void 0;
// Scanning mechanism for the checkout. Adds all scanned items to the cart
var scanProduct = function (state) { return ({
    scan: function (product) {
        state.cart.push(product);
    }
}); };
exports.scanProduct = scanProduct;
// Checkout mechanism for displaying the cart total which includes all promotions
// specified
var checkoutTotal = function (state, promotions) { return ({
    total: function () {
        // Check for any eligible promotions in the cart and apply them
        promotions.forEach(function (applyPromotion) {
            applyPromotion(state);
        });
        var checkoutCart = __spreadArray(__spreadArray([], state.cart), state.checkoutProducts);
        // Calculate the total price
        var totalPrice = checkoutCart.reduce(function (prev, curr) {
            return prev + curr.price;
        }, 0);
        // Create output string
        var allSkusScanned = checkoutCart.reduce(function (prev, curr) {
            return prev + (curr.sku + ", ");
        }, "");
        // Not ideal to use the console for output but it will do for now
        console.log("SKUs Scanned: " + allSkusScanned + " Total: $" + totalPrice.toFixed(2));
    }
}); };
exports.checkoutTotal = checkoutTotal;
