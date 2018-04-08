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
                <el-form-item label="店铺名称" prop="storeName">
                    <el-input v-model="ruleForm.storeName"></el-input>
                </el-form-item>
                <el-form-item label="经营范围" prop="businessScope">
                    <el-select v-model="ruleForm.businessScope" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开店时间" required>
                    <el-col :span="18">
                        <el-form-item prop="openTime">
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleForm.openTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="店铺地址" prop="address">
                    <el-input type="textarea" v-model="ruleForm.address"></el-input>                    
                </el-form-item>
                <el-form-item label="店主姓名" prop="bossName">
                    <el-input v-model="ruleForm.bossName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phoneNum">
                    <el-input type="textarea" v-model="ruleForm.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="支付宝账号" prop="moneyId">
                    <el-input type="textarea" v-model="ruleForm.moneyId"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="contentBox" v-show="active==2?true:false">
          <el-form :model="ruleForm2" :rules="rules"  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="身份证号" prop="idCardNum">
                <el-input v-model="ruleForm2.idCardNum"></el-input>
            </el-form-item>
            <el-form-item label="证件姓名" prop="idCardName">
              <el-input v-model="ruleForm2.idCardName"></el-input>
            </el-form-item>
            <el-form-item label="居住地址" prop="idCardAddress">
              <el-input v-model="ruleForm2.idCardAddress"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="contact">
              <el-input v-model="ruleForm2.contact"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="goback('ruleForm')">上一步</el-button>
              <el-button type="primary" @click="submitForm('ruleForm2')" >下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="contentBox" v-show="active==3?true:false">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="5"
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
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      active: 3,
      ruleForm: {
        storeName: "",
        businessScope: "",
        openTime: "",
        address: "",
        bossName: "",
        phoneNum: "",
        moneyId: ""
      },
      ruleForm2: {
        idCardNum: "",
        idCardName: "",
        idCardAddress: "",
        contact: ""
      },
      rules: {
        storeName: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        businessScope: [
          { required: true, message: "请选择经营范围", trigger: "change" }
        ],
        openTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "请填写店铺地址",
            trigger: "blur"
          }
        ],
        bossName: [
          { required: true, message: "请填写店主姓名", trigger: "blur" }
        ],
        phoneNum: [
          { required: true, message: "请填写联系方式", trigger: "blur" }
        ],
        moneyId: [
          { required: true, message: "请填写支付宝账号", trigger: "blur" }
        ],
        idCardNum: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        idCardName: [
          { required: true, message: "请输入证件姓名", trigger: "blur" }
        ],
        idCardAddress: [
          { required: true, message: "请输入证件地址", trigger: "blur" }
        ],
        contact: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    register() {
      console.log("注册");
    },
    submitForm(formName) {
      // console.log(this.$refs[formName])
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.formName);
          this.active++;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goback(formName) {
      // this.$refs[formName].resetFields();
      this.active--;
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
    handlePreview(file) {
      console.log(file);
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
      sessionStorage.setItem("user", JSON.stringify({}));
      this.$router.push({
        path: "/table"
      });
    }
  },
  mounted: function() {
    console.log(123);
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