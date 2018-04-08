<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="店铺名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="店铺简介">
			<el-input type="textarea" v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="店铺电话">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="分类添加">
			<el-row :gutter="24">
				<el-tag
				v-for="(tag,index) in tags"
				:key="index"
				closable
				@close="handleClose(index)"
				:type="tag.type">
				{{tag.name}}
				</el-tag>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="10">
					<el-input v-model="className"></el-input>
				</el-col>
				<el-col :span="6">
					<el-button @click="addTags" type="success">添加</el-button>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item>
			<el-button type="primary">确定</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tags: [
        { name: "标签一" },
        { name: "标签二" },
        { name: "标签三" },
        { name: "标签四" },
        { name: "标签五" }
      ],
      className: ""
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClose(index) {
      console.log(index);
      // 发送ajax删除
      this.tags.splice(index, 1);
    },
    addTags() {
      console.log(this.className);
      this.tags.push({
        name: this.className
      });
      this.className = "";
    }
  }
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
