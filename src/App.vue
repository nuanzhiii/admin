<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
   import  {watchEffect} from "vue";
   import jwt_decode from "jwt-decode";
   import {useAuthStore} from "./store/index.ts";

    const store = useAuthStore()
   watchEffect(()=>{
     if (localStorage.token){
       const  decode = jwt_decode(localStorage.token)
       store.setAuth(!!decode)
       store.setUser(decode)
     }
   })

</script>
<style>
html,
body,
#app{
  margin: 0;
  padding: 0;
  height: 100%;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
