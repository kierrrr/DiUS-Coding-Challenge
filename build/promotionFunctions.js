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
exports.freeItem = exports.bulkDiscount = exports.threeForTwo = void 0;
// Generic three for two promotion
// Example: we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, 
// you will pay the price of 2 only
var threeForTwo = function (product) {
    return function (state) {
        var eligibility = state.cart
            .reduce(function (allProducts, currentProduct) {
            // Ignore the ineligible products for promotion
            if (currentProduct.sku !== product.sku) {
                return __assign(__assign({}, allProducts), { newCart: __spreadArray(__spreadArray([], allProducts.newCart), [currentProduct]) });
            }
            ;
            // Every 3rd product is free
            var newPrice = (allProducts.promotionCount % 3 === 0) ? 0 : currentProduct.price;
            var productOnSpecial = __assign(__assign({}, currentProduct), { price: newPrice });
            return __assign(__assign({}, allProducts), { productsOnSpecial: __spreadArray(__spreadArray([], allProducts.productsOnSpecial), [productOnSpecial]), promotionCount: allProducts.promotionCount + 1 });
        }, { newCart: new Array(), productsOnSpecial: new Array(), promotionCount: 1 });
        // Update the state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = __spreadArray(__spreadArray([], state.checkoutProducts), eligibility.productsOnSpecial);
    };
};
exports.threeForTwo = threeForTwo;
// Generic bulk discount promotion
// Example: the brand new Super iPad will have a bulk discounted applied, where the price will drop 
// to $499.99 each, if someone buys more than 4
var bulkDiscount = function (product, threshold, price) {
    return function (state) {
        var eligibility = state.cart
            .reduce(function (allProducts, currentProduct) {
            // Ignore the ineligible products for promotion
            if (currentProduct.sku !== product.sku) {
                return __assign(__assign({}, allProducts), { newCart: __spreadArray(__spreadArray([], allProducts.newCart), [currentProduct]) });
            }
            ;
            // Otherwise, keep track of the eligible ones
            return __assign(__assign({}, allProducts), { productsOnSpecial: __spreadArray(__spreadArray([], allProducts.productsOnSpecial), [currentProduct]) });
        }, { newCart: new Array(), productsOnSpecial: new Array() });
        // Update the price of each product that is eligible
        var productsOnSpecial = eligibility.productsOnSpecial
            .map(function (currentProduct, _, allProducts) {
            return __assign(__assign({}, currentProduct), { price: allProducts.length > threshold ? price : currentProduct.price });
        });
        // Update state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = __spreadArray(__spreadArray([], state.checkoutProducts), productsOnSpecial);
    };
};
exports.bulkDiscount = bulkDiscount;
// Generic promotion for a free product when you buy a particular product
// Example: we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
var freeItem = function (product, freeProduct) {
    return function (state) {
        var numberOfEligibleProducts = state.cart.filter(function (curr) { return curr.sku === product.sku; }).length;
        var eligibility = state.cart
            .reduce(function (prev, curr) {
            // Keeps track of the product that links to the promotion
            if (curr.sku === product.sku) {
                return __assign(__assign({}, prev), { productsOnSpecial: __spreadArray(__spreadArray([], prev.productsOnSpecial), [curr]) });
            }
            // Change the price of the free item as it is eligible in this promotion
            else if (curr.sku === freeProduct.sku && numberOfEligibleProducts > 0) {
                numberOfEligibleProducts -= 1; // Keep track of the number of free products we can give away
                var freeProduct_1 = __assign(__assign({}, curr), { price: 0 });
                return __assign(__assign({}, prev), { productsOnSpecial: __spreadArray(__spreadArray([], prev.productsOnSpecial), [freeProduct_1]) });
            }
            // Ignore the ineligible products for promotion
            else {
                return __assign(__assign({}, prev), { newCart: __spreadArray(__spreadArray([], prev.newCart), [curr]) });
            }
        }, { newCart: new Array(), productsOnSpecial: new Array() });
        // Update state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = __spreadArray(__spreadArray([], state.checkoutProducts), eligibility.productsOnSpecial);
    };
};
exports.freeItem = freeItem;
