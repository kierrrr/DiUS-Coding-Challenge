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
exports.__esModule = true;
var checkoutFunctions_1 = require("./checkoutFunctions");
var Checkout = function (promotions) {
    // State of the checkout
    // cart - contains all of the scanned products
    // checkoutProducts - the finalised products which includes promotions
    var state = {
        cart: [],
        checkoutProducts: []
    };
    // Compose all functions required for the checkout mechanism
    return __assign(__assign({}, checkoutFunctions_1.scanProduct(state)), checkoutFunctions_1.checkoutTotal(state, promotions));
};
exports["default"] = Checkout;
