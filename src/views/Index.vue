<template>
  <div>
    首页
    <el-button type="primary" class="goback" @click = "lyout()">退出</el-button>
  </div>
</template>
<script setup >
  import {onMounted ,reactive} from "vue"
  import  {current} from "../utils/request.ts"
  import axios  from 'axios'
  import  { useAuthStore } from "../store/index.ts";
  import router from '../router'

  const store = useAuthStore()


  onMounted(async()=>{
    try {
      const  data = await axios.get("api/users/current",)
      console.log(data)
    } catch (err){
      console.log(err)
    }
  })

  const  lyout = ()=>{
    localStorage.removeItem("token")
    store.setAuth(false)
    store.setUser(null)

    router.push("Login")
  }

</script>

<style scoped>

</style>
