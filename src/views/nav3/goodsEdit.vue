<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-select v-model="value" @change="selectEvent" placeholder="请选择商品分类">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="danger">删除选中商品</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table height="400" :data="data" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="goodsId" label="商品ID" width="100" sortable>
				</el-table-column>
				<el-table-column prop="goodsNa" label="商品名称" sortable>
				</el-table-column>
				<el-table-column prop="money" label="商品金额" sortable>
				</el-table-column>
				<el-table-column prop="addr" label="商品分类"  sortable>
				</el-table-column>
                <el-table-column prop="addr" label="商品标签"  sortable>
				</el-table-column>
				<el-table-column label="状态" width="100">
					<template slot-scope="scope">
						<el-button
						size="mini"
						type="primary"
						@click="agree(scope.$index, scope.row)">商品编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

		<!-- 弹出框 -->
		<el-dialog title="退货操作" :visible.sync="dialogFormVisible">
			<div class="dialogBox">
				<el-form :model="returnCourierForm">
					<el-form-item label="退货地址" :label-width="formLabelWidth">
						<el-input type="textarea" v-model="returnCourierForm.courierA"></el-input>
					</el-form-item>
					<el-form-item label="收件人电话" :label-width="formLabelWidth">
							<el-input v-model="returnCourierForm.courierN"></el-input>
					</el-form-item>
				</el-form>
			</div>
			
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="returnSure">确定</el-button>
			</div>
		</el-dialog>

    <el-dialog title="驳回操作" :visible.sync="dialogFormVisible2">
			<div class="dialogBox">
				<el-form :model="rejectForm">
					<el-form-item label="驳回理由" :label-width="formLabelWidth">
						<el-input type="textarea" v-model="rejectForm.rejectContent"></el-input>
					</el-form-item>
					<!-- <el-form-item label="收件人电话" :label-width="formLabelWidth">
							<el-input v-model="returnCourierForm.courierN"></el-input>
					</el-form-item> -->
				</el-form>
			</div>
			
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="rejectSure">确定</el-button>
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
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
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
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
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
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
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
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
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
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
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
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
          buyWa: "货到付款",
          state: true,
          addr: {
            name: "韩大鸽",
            phoneNu: "18800462896",
            address: "北京回龙观昌平区龙跃苑二区23-5-502"
          }
        },
        {
          goodsId: "213",
          goodsNa: "苹果香蕉梨子",
          goodsIn: "500g123123123123123123",
          buyTi: "2018-4-10",
          money: 100,
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
      dialogFormVisible2: false,
      // 退货列表
      returnCourierForm: {
        courierA: "",
        courierN: ""
      },
      // 驳回列表
      rejectForm: {
        rejectContent: ""
      },
      formLabelWidth: "120px",
      rowInf: {
        index: null,
        data: {}
      },
      options: [
        {
          value: "选项1",
          label: "退货申请"
        },
        {
          value: "选项2",
          label: "已退申请"
        },
        {
          value: "选项3",
          label: "驳回申请"
        }
      ],
      value: ""
    };
  },
  methods: {
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
    selectEvent() {
      // select改变发送ajax请求
      console.log(this.value);
    },
    dissagree(index, row) {
      let data = {
        rejectContent: ""
      };
      this.rejectForm = data;
      this.dialogFormVisible2 = true;
    },
    // 点击同意退货
    agree(index, row) {
      let data = {
        courierA: "",
        courierN: ""
      };
      this.returnCourierForm = data;
      // 标记index和row信息
      this.rowInf.index = index;
      this.rowInf.data = row;
      console.log(this.rowInf);
      // 已发货的逻辑
      // 发送ajax请求数据
      this.dialogFormVisible = true;
    },
    returnSure() {
      // 发送ajax请求提交发货信息
      this.dialogFormVisible = false;
    },
    rejectSure() {
      this.dialogFormVisible2 = false;
    }
  },
  mounted() {
    // this.getUser();
  }
};
// function clearSendFrom() {
//   let from = [
//     {
//       goodsId: "214",
//       goodsNa: "苹果香蕉梨子",
//       goodsIn: "500g123123123123123123",
//       buyTi: "2018-4-10",
//       money: 100,
//       buyWa: "货到付款",
//       state: false,
//       addr: {
//         name: "韩大鸽",
//         phoneNu: "18800462896",
//         address: "北京回龙观昌平区龙跃苑二区23-5-502"
//       }
//     },
//     {
//       goodsId: "213",
//       goodsNa: "苹果香蕉梨子",
//       goodsIn: "500g123123123123123123",
//       buyTi: "2018-4-10",
//       money: 100,
//       buyWa: "货到付款",
//       state: true,
//       addr: {
//         name: "韩大鸽",
//         phoneNu: "18800462896",
//         address: "北京回龙观昌平区龙跃苑二区23-5-502"
//       }
//     }
//   ];
//   let data = new Array();
//   from.forEach(function(e) {
//     if (typeof e == object) {
//       for (var item in e) {
//         if (typeof item != Object || typeof item != Array) {

//         }
//       }
//     } else {
//       data.push(e);
//     }
//   });
// }
</script>

<style scoped>
.dialogBox {
  width: 90%;
}
</style>