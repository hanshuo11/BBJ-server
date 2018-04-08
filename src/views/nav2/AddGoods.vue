<template>
	<el-form class="content" ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item class="Iwidth" label="商品标题">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item class="Iwidth" label="商品分类">
			<el-select v-model="form.region" placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item class="Iwidth" label="商品标签">
			<el-input placeholder="请使用关键字填写商品标签，系统会根据标签给用户推送" v-model="form.name"></el-input>
			<div class="inf">
				例如：“运动鞋”、“男士运动鞋”.....详细参考标签手册，如填写不对系统将驳回商品添加
			</div>
		</el-form-item>
		<el-form-item class="Iwidth" label="运费价格">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item class="Iwidth" label="商品库存">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item class="Iwidth" label="首页价格">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item class="Iwidth" label="商品详情">
			<el-upload
			class="upload-demo"
			ref="upload"
			action="https://jsonplaceholder.typicode.com/posts/"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:file-list="fileList"
			:auto-upload="false">
			<el-button slot="trigger" size="small" type="warning">选取文件</el-button>
			<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
			</el-upload>
		</el-form-item>
		<el-form-item class="Iwidth" label="套餐设置">
			<el-form-item class="inputWidth" label="价格:">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item class="inputWidth" label="规格:">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item class="inputWidth" label="属性:">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-button class="addButton" type="primary">添加套餐</el-button>
		</el-form-item>
		<el-form-item>
			<el-button type="primary">立即添加</el-button>
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
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="scss" scoped>
/* addButton */
.content {
  .Iwidth {
    width: 500px;
    .inputWidth {
      width: 80%;
      margin-top: 10px;
    }
    .addButton {
      float: right;
	  margin-top:5px;
    }
	.inf{
		font-size: 11px;
		color: #7e7b7b;
		line-height: 14px;
	}
  }
}
</style>
