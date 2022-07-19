"use strict";
exports.__esModule = true;
exports.useAuthStore = void 0;
var pinia_1 = require("pinia");
exports.useAuthStore = (0, pinia_1.defineStore)('auth', {
    state: function () {
        return { isAuthenticated: false, user: {} };
    },
    //状态修改
    actions: {
        setAuth: function (isAuth) {
            if (isAuth) {
                this.isAuthenticated = isAuth;
            }
            else {
                this.isAuthenticated = false;
            }
        },
        setUser: function (user) {
            if (user) {
                this.user = user;
            }
            else {
                this.user = {};
            }
        }
    },
    //计算属性
    getters: {
        getAuthenticated: function (state) { return state.isAuthenticated; },
        getUser: function (state) { return state.user; }
    }
});
//# sourceMappingURL=index.js.map