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
var threeForTwo = function (product) {
    return function (state) {
        var allProducts = state.cart
            .reduce(function (prev, curr) {
            if (curr.sku !== product.sku) {
                return __assign(__assign({}, prev), { newCart: __spreadArray(__spreadArray([], prev.newCart), [curr]) });
            }
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
var bulkDiscount = function (product, threshold, price) {
    return function (state) {
        var allProducts = state.cart
            .reduce(function (prev, curr) {
            if (curr.sku !== product.sku) {
                return __assign(__assign({}, prev), { newCart: __spreadArray(__spreadArray([], prev.newCart), [curr]) });
            }
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
var freeProduct = function (product, freeProduct) {
    return function (state) {
        var allProducts = state.cart
            .reduce(function (prev, curr) {
            if (curr.sku !== product.sku) {
                return __assign(__assign({}, prev), { newCart: __spreadArray(__spreadArray([], prev.newCart), [curr]) });
            }
            var productOnSpecial = __assign(__assign({}, freeProduct), { price: 0 });
            return __assign(__assign({}, prev), { productsOnSpecial: __spreadArray(__spreadArray([], prev.productsOnSpecial), [curr, productOnSpecial]) });
        }, { newCart: new Array(), productsOnSpecial: new Array() });
        state.cart = allProducts.newCart;
        state.checkoutProducts = __spreadArray(__spreadArray([], state.checkoutProducts), allProducts.productsOnSpecial);
    };
};
exports.freeProduct = freeProduct;
