<template>
  <div class="background">
    <div class="registerBox">
        <el-steps :active="active" simple>
            <el-step title="基本信息" icon="el-icon-edit"></el-step>
            <el-step title="身份验证" icon="el-icon-upload"></el-step>
            <el-step title="上传证件" icon="el-icon-picture"></el-step>
        </el-steps>
        <div class="contentBox" v-show="active==1?true:false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户账号" prop="store_userName">
                    <el-input v-model="ruleForm.store_userName"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="store_password">
                    <el-input v-model="ruleForm.store_password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="surepassword">
                    <el-input v-model="store_password"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称" prop="store_name">
                    <el-input v-model="ruleForm.store_name"></el-input>
                </el-form-item>
                <el-form-item label="经营范围" prop="store_businessScope">
                    <el-select v-model="ruleForm.store_businessScope" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开店时间" required>
                    <el-col :span="18">
                        <el-form-item prop="store_openTime">
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleForm.store_openTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="店铺地址" prop="store_address">
                    <el-input type="textarea" v-model="ruleForm.store_address"></el-input>                    
                </el-form-item>
                <el-form-item label="店主姓名" prop="store_bossName">
                    <el-input v-model="ruleForm.store_bossName"></el-input>
                </el-form-item>
                <el-form-item label="店铺邮箱" prop="store_email">
                    <el-input type="textarea" v-model="ruleForm.store_email"></el-input>
                </el-form-item>
                <el-form-item label="支付宝账号" prop="store_moneyId">
                    <el-input type="textarea" v-model="ruleForm.store_moneyId"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="contentBox" v-show="active==2?true:false">
          <el-form :model="ruleForm2" :rules="rules"  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="身份证号" prop="store_idCardNum">
                <el-input v-model="ruleForm2.store_idCardNum"></el-input>
            </el-form-item>
            <el-form-item label="证件姓名" prop="store_idCardName">
              <el-input v-model="ruleForm2.store_idCardName"></el-input>
            </el-form-item>
            <el-form-item label="居住地址" prop="store_idCardAddress">
              <el-input v-model="ruleForm2.store_idCardAddress"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="store_bossPhoneNum">
              <el-input v-model="ruleForm2.store_bossPhoneNum"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="goback('ruleForm')">上一步</el-button>
              <el-button type="primary" @click="submitForm('ruleForm2')" >下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="contentBox" v-show="active==3?true:false">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="http://localhost:3000/store/uploadingImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :auto-upload="false"
            :on-success="uploadSuccess"
            list-type="picture-card"
            :limit="5"
            :data="uploadData"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请您上传实体店铺经营证、正反身份证扫描件、2张店铺图片（只能上传jpg/png文件）</div>
          </el-upload>
          <div class="button-box">
            <el-button @click="active--">上一步</el-button>
            <el-button type="success" @click="success" >完成</el-button>
          </div>                   
        </div>
    </div>
  </div>
</template>

<script>
// import { requestLogin } from "../api/api";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      fileList: [],
      active: 1,
      ruleForm: {
        store_userName: "",
        store_password: "",
        store_name: "",
        store_businessScope: "",
        store_openTime: "",
        store_address: "",
        store_bossName: "",
        store_email: "",
        store_moneyId: ""
      },
      ruleForm2: {
        store_idCardNum: "",
        store_idCardName: "",
        store_idCardAddress: "",
        store_bossPhoneNum: ""
      },
      store_password: "",
      rules: {
        store_userName: [
          { required: true, message: "请设置用户名", trigger: "blur" }
        ],
        store_password: [{ required: true, message: "请设置密码", trigger: "blur" }],
        surepassword: [
          { required: false, message: "请确认密码", trigger: "blur" }
        ],
        store_name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        store_businessScope: [
          { required: true, message: "请选择经营范围", trigger: "change" }
        ],
        store_openTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        store_address: [
          {
            required: true,
            message: "请填写店铺地址",
            trigger: "blur"
          }
        ],
        store_bossName: [
          { required: true, message: "请填写店主姓名", trigger: "blur" }
        ],
        store_email: [
          { required: true, message: "请填写联系方式", trigger: "blur" }
        ],
        store_moneyId: [
          { required: true, message: "请填写支付宝账号", trigger: "blur" }
        ],
        store_idCardNum: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        store_idCardName: [
          { required: true, message: "请输入证件姓名", trigger: "blur" }
        ],
        store_idCardAddress: [
          { required: true, message: "请输入证件地址", trigger: "blur" }
        ],
        store_bossPhoneNum: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ]
      },
      // 上传表单返回的数据
      result: "",
      uploadData: {
        insertId: null
      }
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.active++;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 返回上一层
    goback(formName) {
      this.active--;
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
    handlePreview(file) {
      console.log(file.response);
    },
    uploadSuccess(file) {
      let _this = this;
      // 上传图片成功后会提示并跳转路由
      if (file.newPath) {
        _this.$message({
          message: "店铺注册成功请等待系统审核，请等待短息通知！",
          type: "success"
        });
        _this.$router.push({
          path: "/login"
        });
      } else {
        _this.$message({
          message: file.error,
          type: "error"
        });
      }
    },
    // 上传限制提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 移除上传文件提示
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    success() {
      let _this = this;
      // 先提交表单信息
      let data = { ..._this.ruleForm, ..._this.ruleForm2 };
      postJSON("/store/storeRegister", data).then(function(res) {
        let result = JSON.parse(res.text).affectedRows;
        if (result == 1) {
          _this.uploadData.insertId = JSON.parse(res.text).insertId;
          // 表单提交成功之后再上传图片
          _this.$refs.upload.submit();
        }
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
  overflow: auto;
  .registerBox {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 20px auto;
    width: 700px;
    min-height: 400px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 5px #cac6c6;
    .contentBox {
      width: 500px;
      margin-top: 40px;
    }
    .button-box {
      margin-top: 20px;
    }
  }
}
</style>