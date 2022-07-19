"use strict";
exports.__esModule = true;
exports.current = exports.Register = exports.loginApi = void 0;
// @ts-ignore
var http_ts_1 = require("./http.ts");
//登陆接口封装
var loginApi = function (data) {
    return (0, http_ts_1.post)({
        url: '/users/login',
        data: data
    });
};
exports.loginApi = loginApi;
var Register = function (data) {
    return (0, http_ts_1.post)({
        url: '/users/register',
        data: data
    });
};
exports.Register = Register;
var current = function (data) {
    return (0, http_ts_1.get)({
        url: '/users/current',
        data: data
    });
};
exports.current = current;
//# sourceMappingURL=request.js.map