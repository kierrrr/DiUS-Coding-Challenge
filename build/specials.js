"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.threeForTwo = void 0;
var threeForTwo = function (sku) {
    return function (state) {
        var newCart = [];
        var productsOnSpecial = state.cart.reduce(function (specialProducts, currentProduct) {
            // Remove the products that are not part of this special
            if (currentProduct.sku !== sku) {
                newCart.push(currentProduct);
                return specialProducts;
            }
            ;
            // Every 3rd product is free
            var newPrice = (specialProducts.count % 3 === 0) ? 0 : currentProduct.price;
            var productOnSpecial = __assign(__assign({}, currentProduct), { price: newPrice });
            return { newCart: __spreadArray(__spreadArray([], specialProducts.newCart), [productOnSpecial]), count: specialProducts.count + 1 };
        }, { newCart: new Array(), count: 1 });
        state.cart = newCart;
        state.checkoutProducts = __spreadArray(__spreadArray([], state.checkoutProducts), productsOnSpecial.newCart);
    };
};
exports.threeForTwo = threeForTwo;
