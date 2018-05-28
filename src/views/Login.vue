<template>
  <div class="background">
    <el-form :model="userInf" :rules="rules2" ref="userInf" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">BBJ后端登录系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="userInf.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="userInf.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item class="selectBox" prop="selectV">
        <el-select class="select" v-model="userInf.selectV" size="mini" placeholder="请选择登录类型">
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
export default {
  data() {
    return {
      logining: false,
      userInf: {
        account: "",
        checkPass: "",
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
      this.$refs.userInf.validate(valid => {
        var loginParams = {
          username: this.userInf.account,
          password: this.userInf.checkPass,
          class: this.userInf.selectV
        };
        if (valid) {
          // _this.logining = true;
          // this.$message.error("该用户不存在！");
          // _this.logining = false;
          if (loginParams.class == "admin") {
            sessionStorage.setItem("admin", "{}");
            this.$router.replace({
              path: "/storeCheck"
            });
            return;
          }
          if (loginParams.class == "user") {
            postJSON("/store/storeLogin", {
              store_userName: loginParams.username,
              store_password: loginParams.password
            }).then(function(res) {
              console.log(res);
              if (res.body) {
                sessionStorage.setItem("user", JSON.stringify(res.body[0]));
                _this.$router.replace({
                  path: "/indent"
                });
              } else {
                _this.$message.error("用户不存在或审核未通过");
              }
            });
          }
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
      margin-left: 63px;
    }
  }
}
</style>