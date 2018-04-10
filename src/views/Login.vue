<template>
  <div class="background">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">BBJ后端登录系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item class="selectBox" prop="selectV">
        <el-select class="select" v-model="ruleForm2.selectV" size="mini" placeholder="请选择登录类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width:100%;textAlign: center;">
        <el-button type="success" style="width:45%;" @click.native.prevent="register">店铺注册</el-button>
        <el-button type="primary" style="width:45%;" @click.native.prevent="login" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { requestLogin } from "../api/api";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "admin",
        checkPass: "123456",
        selectV: ""
      },
      value: "",
      options: [
        {
          value: "user",
          label: "商家版"
        },
        {
          value: "admin",
          label: "企业版"
        }
      ],
      rules2: {
        account: [
          {
            // 是否必填
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        selectV: [
          {
            required: true,
            message: "请选择登录类型",
            trigger: "change"
          }
        ]
      },
      checked: true
    };
  },
  methods: {
    login(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        var loginParams = {
          username: this.ruleForm2.account,
          password: this.ruleForm2.checkPass,
          class: this.ruleForm2.selectV
        };
        if (valid) {
          // _this.logining = true;
          // this.$message.error("该用户不存在！");
          // _this.logining = false;
          // NProgress.done();
          if (loginParams.class == "admin") {
            sessionStorage.setItem("admin", "{}");
            this.$router.replace({
            path: "/indent"
          });
            return ;
          }
          sessionStorage.setItem("user", "{}");
          this.$router.replace({
            path: "/indent"
          });
        } else {
          console.log("erro!");
          return false;
        }
      });
    },
    register() {
      // console.log("注册");
      this.$router.push({
        path: "/register"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1f2d3d;
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 5px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .selectBox {
      display: inline-block;
      margin-left: 72px;
    }
  }
}
</style>