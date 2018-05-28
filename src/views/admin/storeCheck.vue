<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
          <el-form-item>
            <el-select v-model="value" @change="selectEvent" placeholder="请选择">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<template>
			<el-table :data="data" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60" >
				</el-table-column>
				<el-table-column prop="store_id" label="申请id"  sortable>
				</el-table-column>
				<el-table-column prop="store_name" label="店铺名称" >
				</el-table-column>
				<el-table-column prop="store_bossName" label="店主名称" >
				</el-table-column>
				<el-table-column prop="store_resTime" label="申请时间"  sortable>
				</el-table-column>
				<el-table-column prop="store_businessScope" label="经营范围" >
				</el-table-column>
				<el-table-column prop="store_email" label="店铺邮箱" >
				</el-table-column>
				<el-table-column label="店铺地址"  >
					 <template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
              <p>电话: {{ scope.row.store_bossPhoneNum }}</p>
              <p>地址: {{ scope.row.store_address}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">地址详情</el-tag>
              </div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
            <div>
                <el-button
                v-show="scope.row.state==1?true:false"
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row,'noChecked')">待审核</el-button>
            </div>
            <div>
                <el-button
                v-show="scope.row.state==2?true:false"
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">审核通过</el-button>
            </div>
						<div>
                <el-button
                v-show="scope.row.state==3?true:false"
                size="mini"
                type="warning"
                @click="handleEdit(scope.$index, scope.row)">审核未通过</el-button>
            </div>
					</template>
				</el-table-column>
			</el-table>
		</template>

		<!-- 弹出框 -->
		<el-dialog title="审核操作" :visible.sync="dialogFormVisible">
			<div class="dialogBox">
				<el-form label-width="100px" :disabled="true">
            <span  v-for="(item, index) in rowInf.data" :key="index">
                <img :src="item.store_imgUrl" class="image">
            </span>
            <el-form-item label="证件ID：">
              <el-input v-model="dialogData.store_idCardNum" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="证件姓名：">
              <el-input v-model="dialogData.store_idCardName" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="居住地址：">
              <el-input v-model="dialogData.store_idCardAddress" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input v-model="dialogData.store_bossPhoneNum" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="驳回理由：" v-if="regState==3?true:false">
              <el-input type="textarea" v-model="refuseData.refuse_content" :style="inputWidth"></el-input>
            </el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer" v-if="regState==1?true:false">
				<el-button type="warning" @click="dialogFormVisible1=true">驳回申请</el-button>
				<el-button type="success" @click="agreeReg">审核通过</el-button>
			</div>
		</el-dialog>

    <el-dialog title="驳回理由" :visible.sync="dialogFormVisible1">
			<div class="dialogBox">
				<el-form>
          <el-input
          v-model="refuseContent"
          type="textarea"
          :rows="2"
          placeholder="请输入驳回理由"
          >
          </el-input>
				</el-form>
			</div>
			<div slot="footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
				<el-button type="success" @click="refuseReg">确定</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
// import { getUserList } from "../../api/api";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      loading: false,
      data: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: "120px",
      rowInf: {
        index: null,
        data: []
      },
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "2",
          label: "审核通过"
        },
        {
          value: "3",
          label: "审核未通过"
        }
      ],
      value: "",
      refuseContent: "",
      dialogData: {},
      inputWidth: "width:400px;",
      regState: null,
      refuseData: {}
    };
  },
  methods: {
    selectEvent: function() {
      var _this = this;
      if(_this.value==0){
        _this.getStoreList();
        return;
      }
      // 获取店铺信息
      postJSON("/store/selectListByState", { state: _this.value }).then(function(
        res
      ) {
        _this.data = res.body;
      });
    },
    //获取用户列表
    getStoreList: function() {
      var _this = this;
      // 获取店铺信息
      postJSON("/store/getStoreList", {}).then(function(res) {
        _this.data = res.body;
      });
    },
    // 点击编辑
    handleEdit(index, row, flag) {
      var _this = this;
      _this.refuseData = {};
      // 标记index和row信息
      this.rowInf.index = index;
      // 获取店铺下的证件照片
      postJSON("/store/getStoreImg", { store_id: row.store_id }).then(function(
        res
      ) {
        _this.rowInf.data = res.body;
        postJSON("/store/getRefuseContent", { store_id: row.store_id }).then(
          function(res) {
            _this.refuseData = res.body[0];
            console.log(_this.refuseData);
          }
        );
      });
      // 将对应的店铺的状态信息存入regState
      _this.regState = this.data[index].state;
      // 将对应的店铺信息存入dialogData
      this.dialogData = this.data[index];
      this.dialogFormVisible = true;
    },
    agreeReg() {
      // 发送ajax请求提交发货信息
      var _this = this;
      postJSON("/store/agreeReg", { store_id: this.dialogData.store_id }).then(
        function(res) {
          _this.dialogFormVisible = false;
          _this.dialogData = {};
          _this.$message({
            message: "店铺审核通过",
            type: "success"
          });
          _this.getStoreList();
        }
      );
    },
    refuseReg() {
      var _this = this;
      var store_id = this.dialogData.store_id;
      var refuseContent = this.refuseContent;
      var store_email=this.dialogData.store_email;
      postJSON("/store/refuseReg", {
        store_id: store_id,
        refuse_content: refuseContent,
        store_email:store_email
      }).then(function(res) {
        _this.dialogFormVisible = false;
        _this.dialogFormVisible1 = false;
        _this.dialogData = {};
        _this.refuseContent = "";
        _this.$message({
          message: "店铺审核已驳回",
          type: "success"
        });
        _this.getStoreList();
      });
      // this.dialogFormVisible1=true;
    }
  },
  mounted() {
    this.getStoreList();
  }
};
</script>

<style scoped>
.dialogBox {
  width: 90%;
}
.hint {
  width: 100%;
  text-align: center;
  color: #7e7b7b;
  font-size: 13px;
}
.dialog-footer {
  text-align: center;
}

.image {
  width: 150px;
  margin-left: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>