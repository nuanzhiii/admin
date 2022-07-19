<template>
  <div class="register">
    <div class="form-container">
      <div class="manage-tip">
        <span>后台管理系统</span>
         <el-form
             ref="ruleFormRef"
             :rules="rules"
             class="registerForm"
             label-width="100px"
             :model="registerUser">
            <el-form-item  label="用户名" prop="name">
                <el-input  v-model="registerUser.name"   placeholder="请输入用户名"></el-input>
            </el-form-item>
           <el-form-item label="密码" prop="password">
                <el-input  v-model="registerUser.password"  placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
           <el-form-item  label="请确认密码" prop="password2">
                <el-input  v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
            </el-form-item>
           <el-form-item label="邮箱" prop="email">
             <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
           </el-form-item>
           <el-form-item label="选择身份" prop="email">
            <el-select v-model="registerUser.identity" placeholder="选择身份">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="员工" value="员工"></el-option>
            </el-select>
           </el-form-item>


           <el-form-item>
             <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn">
               注册
             </el-button>
           </el-form-item>
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
import  {Register} from "../utils/request.ts"


const ruleFormRef = ref<FormInstance>()
const router = useRouter()

interface registerType{
  name:string,
  password:string,
  password2:string,
  email:string,
  identity:string,
}

const registerUser = ref<registerType>({
  name:"",
  password:"",
  password2:"",
  email:"",
  identity:"",
})

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('重新输入密码'))
  } else if (value !== registerUser.value.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}
//验证规则
const rules = reactive({
  name: [
      { required:true,message:'用户名不能为空', trigger: 'blur' },
      {min:2,max:10,message: "长度在2到10之间",trigger: 'blur'},
  ],
  password: [
    { required:true,message:'密码不能为空', trigger: 'blur' },
    {min:6,max:30,message: "长度在6到30之间",trigger: 'blur'},
  ],
  password2: [
    // { required:true, message:'密码不一致', trigger: 'blur' },
    {min:6,max:30, message: "长度在6到30之间",trigger: 'blur'},
    { validator:validatePass2, trigger: 'blur'}
  ],
  email: [
      { type:"email", required:true,message:'邮箱格式不对',trigger: 'blur' }
  ],
})




//注册按钮事件
const handleSubmit = (formEl: FormInstance | undefined)=>{


 // Register(registerUser).then(res=>{
 //
 //  })
  // console.log(registerUser.value)
  if (!formEl) return
formEl.validate(async (valid) => {
    if (valid) {
      const {data} = await axios.post("api/users/register",
          registerUser.value
      );
      console.log(data)
       //@ts-ignore
      ElMessage({
        message: '用户注册成功',
        type: 'success',
      })

      await router.push("/Login");

    } else {
      // //@ts-ignore
      // ElMessage({
      //   message: '用户已注册',
      //   type: 'warning',
      // })
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