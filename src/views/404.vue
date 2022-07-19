<template>
  <div class="not-found">
    <img src="../assets/logo.png" alt="error" />

    <el-button type="primary" class="goback" @click = "$router.push('/Login')">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>
 .not-found{
   width: 100%;
   height: 100%;
   overflow: hidden;
 }
 .not-found img{
   width: 100%;
   height: 100%;
 }
 .goback{
   position: absolute;
   z-index: 9999;
   top: 50%;
   left: 50%;
 }
</style>