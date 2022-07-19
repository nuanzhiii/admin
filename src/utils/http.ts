import axios from 'axios';
import {routerKey} from "vue-router";

//使用axios的.create方法创建一个service的实例
const service= axios.create({
    //通杀跨域问题,在vite.config.js中添加名为/api的跨域问题
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: '这里填基准地址',
    //             changeOrigin: true,
    //         }
    //     }
    // }
    baseURL:'/api',
    timeout:2000,
    //请求头
    headers:{
        //需要配置请求头可以写

    }
});


//请求拦截器,在发起请求时触发 interceptors.request是请求开始拦截
service.interceptors.request.use(config=>{
    //携带token
    if (localStorage.token){
        config.headers.Authorization = localStorage.token
    }
    return config;
},error => {
    // @ts-ignore
    return Promise.reject(error)
}),

//请求响应拦截器 interceptors.response是响应拦截 请求结束后触发
service.interceptors.response.use(response=>{
    return response
},error => {
    const  {status}  = error.response
    if (status !== 200 ){
        // localStorage.removeItem("token")

        //打印报错信息
        console.log(error)
        alert("接口出问题")
        //路由跳转
    }

})
//封装post请求并对外暴露
export const post =config=>{
    return service({
        ...config,
        method:'post',//提交方法
        data:config.data
    })

}
//封装get请求并对外暴露
export const get =config=>{
    return service({
        ...config,
        method:'get',
        data:config.data
    })

}