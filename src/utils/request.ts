// @ts-ignore
import {post,get} from './http.ts'
//登陆接口封装
export const loginApi = data=>{
  return post({
    url:'/users/login',
    data
  })
}
export const Register =data=>{
  return post({
    url:'/users/register',
    data
  })
}
export const current =data=>{
  return get({
    url:'/users/current',
    data
  })
}




