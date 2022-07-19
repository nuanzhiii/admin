import {createRouter, createWebHistory} from 'vue-router'
import Index from '../views/Index.vue'

const routes = [
    {
        path: '/',
        // name: 'home',
        // component: Index,
        redirect:'/login',
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue'),
        meta: {
            title: '404 not-found'
        }
    },  {
        path: '/Register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/Index',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        meta: {
            title: 'Index'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=>{

     const  isLogin =  localStorage.token ? true : false

    if (to.path ==="/login" || to.path ==="/register"){
        next()
    } else{
        isLogin ? next() : next("/login")
    }

})



export default router
