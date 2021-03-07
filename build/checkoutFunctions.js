"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.checkoutTotal = exports.scanProduct = void 0;
var scanProduct = function (state) { return ({
    scan: function (product) {
        state.cart.push(product);
    }
}); };
exports.scanProduct = scanProduct;
var checkoutTotal = function (state, promotions) { return ({
    total: function () {
        promotions.forEach(function (applyPromotion) {
            applyPromotion(state);
        });
        var checkoutCart = __spreadArray(__spreadArray([], state.cart), state.checkoutProducts);
        var totalPrice = checkoutCart.reduce(function (prev, curr) {
            return prev + curr.price;
        }, 0);
        var allSkusScanned = checkoutCart.reduce(function (prev, curr) {
            return prev + (curr.sku + ", ");
        }, "");
        console.log("SKUs Scanned: " + allSkusScanned + " Total: $" + totalPrice);
    }
}); };
exports.checkoutTotal = checkoutTotal;
