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
var Checkout = function (checkoutSpecials) {
    var state = {
        cart: [],
        checkoutProducts: []
    };
    return __assign(__assign({}, checkoutFunctions_1.scanProduct(state)), checkoutFunctions_1.checkoutTotal(state, checkoutSpecials));
};
exports["default"] = Checkout;
