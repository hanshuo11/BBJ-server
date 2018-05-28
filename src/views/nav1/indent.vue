<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="data" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60" >
				</el-table-column>
				<el-table-column prop="goodsId" label="订单id"  sortable>
				</el-table-column>
				<el-table-column prop="goodsNa" label="商品名称" sortable>
				</el-table-column>
				<el-table-column prop="goodsIn" label="商品规格" sortable>
				</el-table-column>
				<el-table-column prop="buyTi" label="购买时间"  sortable>
				</el-table-column>
				<el-table-column prop="money" label="支付金额" sortable>
				</el-table-column>
				<el-table-column prop="buyWa" label="支付方式" sortable>
				</el-table-column>
				<el-table-column prop="addr" label="地址"  sortable>
					 <template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
						<p>电话: {{ scope.row.addr.phoneNu }}</p>
						<p>住址: {{ scope.row.addr.address}}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.addr.name }}收</el-tag>
						</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
            <div>
              <el-button
              v-show="!scope.row.state"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row,'noSend')">未发货</el-button>
            </div>
						<div>
              <el-button
              v-show="scope.row.state"
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">已发货</el-button>
            </div>
					</template>
				</el-table-column>
			</el-table>
		</template>

		<!-- 弹出框 -->
		<el-dialog title="订单操作" :visible.sync="dialogFormVisible">
			<div class="dialogBox">
				<el-form :model="courierForm">
					<el-form-item label="快递单号" :label-width="formLabelWidth">
						<el-input v-model="courierForm.courierC"></el-input>
					</el-form-item>
					<el-form-item label="快递公司" :label-width="formLabelWidth">
							<el-input v-model="courierForm.courierN"></el-input>
					</el-form-item>
          <div class="hint">
            如果店主上门配送快点单号不用填写，快递公司填写“店主配送”即可
          </div>
				</el-form>
			</div>
			
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sendGoods">发货</el-button>
			</div>
		</el-dialog>

	</section>
</template>
<script>
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      loading: false,
      data: [
        {
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: false,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "12312",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-20",
          money: 11100,
          buyWa: "货到付款",
          state: false,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "222",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 1010,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "333",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-1",
          money: 400,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        }
      ],
      dialogFormVisible: false,
      // 快递信息表
      courierForm: {
        courierC: "",
        courierN: ""
      },
      formLabelWidth: "120px",
      rowInf: {
        index: 1111,
        data: {}
      }
    };
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    //获取用户列表
    // getUser: function() {
    //   let para = {
    //     name: this.filters.name
    //   };
    //   this.loading = true;
    //   NProgress.start();
    //   getUserList(para).then(res => {
    //     this.users = res.data.users;
    //     console.log(res.data);
    //     this.loading = false;
    //     //NProgress.done();
    //   });
    // },
    // 点击编辑
    handleEdit(index, row, flag) {
      // 标记index和row信息
      this.rowInf.index = index;
      this.rowInf.data = row;
      console.log(this.rowInf);
      clearSendFrom(this.courierForm);
      // 已发货的逻辑
      if (flag) {
        // 发送ajax请求数据
        this.dialogFormVisible = true;
      } else {
        this.dialogFormVisible = true;
      }
    },
    sendGoods() {
      // 发送ajax请求提交发货信息
      this.dialogFormVisible = false;
      clearSendFrom(this.courierForm);
    }
  },
  mounted() {
    // this.getUser();
  }
};
function clearSendFrom(from) {
  let data = {
    courierC: "",
    courierN: ""
  };
  from = data;
}
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
</style>