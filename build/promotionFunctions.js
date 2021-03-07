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
exports.freeProduct = exports.bulkDiscount = exports.threeForTwo = void 0;
// Generic three for two promotion
// Example: we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, 
// you will pay the price of 2 only
var threeForTwo = function (product) {
    return function (state) {
        var allProducts = state.cart
            .reduce(function (prev, curr) {
            // Ignore the ineligible products for promotion
            if (curr.sku !== product.sku) {
                return __assign(__assign({}, prev), { newCart: __spreadArray(__spreadArray([], prev.newCart), [curr]) });
            }
            ;
            // Every 3rd product is free
            var newPrice = (prev.count % 3 === 0) ? 0 : curr.price;
            var productOnSpecial = __assign(__assign({}, curr), { price: newPrice });
            return __assign(__assign({}, prev), { productsOnSpecial: __spreadArray(__spreadArray([], prev.productsOnSpecial), [productOnSpecial]), count: prev.count + 1 });
        }, { newCart: new Array(), productsOnSpecial: new Array(), count: 1 });
        state.cart = allProducts.newCart;
        state.checkoutProducts = __spreadArray(__spreadArray([], state.checkoutProducts), allProducts.productsOnSpecial);
    };
};
exports.threeForTwo = threeForTwo;
// Generic bulk discount promotion
// Example: the brand new Super iPad will have a bulk discounted applied, where the price will drop 
// to $499.99 each, if someone buys more than 4
var bulkDiscount = function (product, threshold, price) {
    return function (state) {
        var allProducts = state.cart
            .reduce(function (prev, curr) {
            if (curr.sku !== product.sku) {
                return __assign(__assign({}, prev), { newCart: __spreadArray(__spreadArray([], prev.newCart), [curr]) });
            }
            ;
            return __assign(__assign({}, prev), { productsOnSpecial: __spreadArray(__spreadArray([], prev.productsOnSpecial), [curr]) });
        }, { newCart: new Array(), productsOnSpecial: new Array() });
        var productsOnSpecial = allProducts.productsOnSpecial
            .map(function (currentProduct, _, allProducts) {
            return __assign(__assign({}, currentProduct), { price: allProducts.length > threshold ? price : currentProduct.price });
        });
        state.cart = allProducts.newCart;
        state.checkoutProducts = __spreadArray(__spreadArray([], state.checkoutProducts), productsOnSpecial);
    };
};
exports.bulkDiscount = bulkDiscount;
// Generic promotion for a free product when you buy a particular product
// Example: we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
var freeProduct = function (product, freeProduct) {
    return function (state) {
        var numberOfProductOnSpecial = state.cart.filter(function (curr) { return curr.sku === product.sku; }).length;
        var allProducts = state.cart
            .reduce(function (prev, curr) {
            if (curr.sku === product.sku) {
                return __assign(__assign({}, prev), { productsOnSpecial: __spreadArray(__spreadArray([], prev.productsOnSpecial), [curr]) });
            }
            else if (curr.sku === freeProduct.sku && numberOfProductOnSpecial > 0) {
                numberOfProductOnSpecial -= 1;
                var free = __assign(__assign({}, curr), { price: 0 });
                return __assign(__assign({}, prev), { productsOnSpecial: __spreadArray(__spreadArray([], prev.productsOnSpecial), [free]) });
            }
            else {
                return __assign(__assign({}, prev), { newCart: __spreadArray(__spreadArray([], prev.newCart), [curr]) });
            }
        }, { newCart: new Array(), productsOnSpecial: new Array() });
        state.cart = allProducts.newCart;
        state.checkoutProducts = __spreadArray(__spreadArray([], state.checkoutProducts), allProducts.productsOnSpecial);
    };
};
exports.freeProduct = freeProduct;
