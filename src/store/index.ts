import  {defineStore} from "pinia";

export const  useAuthStore  = defineStore('auth',{
    state:() => {
        return {isAuthenticated:false,user:{}}
    },
    //状态修改
    actions:{
        setAuth(isAuth:boolean){
           if (isAuth){
               this.isAuthenticated = isAuth
           }else{
               this.isAuthenticated = false
           }
        },
        setUser(user:any){
            if (user){
                this.user = user
            }else{
                this.user = {}
            }
        }
    },
    //计算属性
    getters:{
        getAuthenticated:(state) => state.isAuthenticated,
        getUser:(state) => state.user

    },
})