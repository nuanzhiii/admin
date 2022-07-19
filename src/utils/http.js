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
exports.get = exports.post = void 0;
var axios_1 = require("axios");
//使用axios的.create方法创建一个service的实例
var service = axios_1["default"].create({
    //通杀跨域问题,在vite.config.js中添加名为/api的跨域问题
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: '这里填基准地址',
    //             changeOrigin: true,
    //         }
    //     }
    // }
    baseURL: '/api',
    timeout: 2000,
    //请求头
    headers: {
    //需要配置请求头可以写
    }
});
//请求拦截器,在发起请求时触发 interceptors.request是请求开始拦截
service.interceptors.request.use(function (config) {
    //携带token
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token;
    }
    return config;
}, function (error) {
    // @ts-ignore
    return Promise.reject(error);
}),
    //请求响应拦截器 interceptors.response是响应拦截 请求结束后触发
    service.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        var status = error.response.status;
        if (status !== 200) {
            // localStorage.removeItem("token")
            //打印报错信息
            console.log(error);
            alert("接口出问题");
            //路由跳转
        }
    });
//封装post请求并对外暴露
var post = function (config) {
    return service(__assign(__assign({}, config), { method: 'post', data: config.data }));
};
exports.post = post;
//封装get请求并对外暴露
var get = function (config) {
    return service(__assign(__assign({}, config), { method: 'get', data: config.data }));
};
exports.get = get;
//# sourceMappingURL=http.js.map