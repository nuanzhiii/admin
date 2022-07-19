<template>
  <div class="register">
    <div class="form-container">
      <div class="manage-tip">
        <span>后台管理系统</span>
        <el-form
            ref="ruleFormRef"
            :rules="rules"
            class="registerForm"
            label-width="70px"
            :model="registerUser.obj">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.obj.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input  v-model="registerUser.obj.password"  placeholder="请输入密码" type="password"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn">
              登录
            </el-button>
          </el-form-item>

          <div class="tiparea">
            <p>
              还没有账号？ 现在<router-link to="/Register">注册</router-link>
            </p>
          </div>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref ,reactive} from "vue";
import  { FormInstance, } from 'element-plus'
import  axios from  "axios"
import  { useRouter } from "vue-router";
import  {loginApi} from "../utils/request.ts"
import jwt_decode from  "jwt-decode"
import  { useAuthStore } from "../store/index.ts";


const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const store = useAuthStore()

interface registerType{
  obj:{
    password:string,
    email:string,
  }

}

const registerUser = reactive<registerType>({
  obj:{
    email:"abcd@163.com",
    password:"123123",
  }
})



//验证规则
const rules = reactive({

  password: [
    { required:true,message:'密码不能为空', trigger: 'blur' },
    {min:6,max:30,message: "长度在6到30之间",trigger: 'blur'},
  ],
  email: [
    { type:"email", required:true,message:'邮箱格式不对',trigger: 'blur' }
  ],
})




//登录按钮事件
const handleSubmit = (formEl: FormInstance | undefined)=>{

  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
     loginApi(registerUser.obj).then(res =>{
       console.log(res)
       const token = res.data.token
        if(res.data.success && res.data.token){
        localStorage.setItem("token",token)
       //解析token
       const  decode = jwt_decode(token)
       // console.log(decode)

       store.setAuth(!!decode)
       store.setUser(decode)
         // @ts-ignore
         ElMessage({
           message: '用户登录成功',
           type: 'success',
         })
         router.push("/Index");
       }
       }).catch(err =>{
       console.log(err)
     })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>

<style scoped>

.register{
  width: 100%;
  height: 100%;
  background: url("../assets/2.jpeg") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.registerForm{
  margin-top: 20px;
}
.register .form-container{
  border-radius: 5px;
  text-align: center;
}
.manage-tip{
  width: 300px;
  font-weight: bold;
  font-size: 26px;
  color: #000;
}
</style>