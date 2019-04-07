<template>
  <div class="container">
    <div class="title">
      <span>修改科室</span>
      <span class="back" @click="back">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
    </div>
    <lin-1px></lin-1px>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请填写名称"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
              <el-input type="textarea" :rows="4" placeholder="请输入简介" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import depart from "@/lin/models/depart";

export default {
  props: {
    editDepartID: {
      type: Number
    }
  },
  data() {
    return {
      form: {
        name: "",
        description: ""
      }
    };
  },
  async mounted() {
    this.form = await depart.getDepart(this.editDepartID);
  },
  methods: {
    async submitForm() {
      const res = await depart.editDepart(this.editDepartID, this.form);
      if (res.error_code === 0) {
        this.$message.success(`${res.msg}`);
        this.$emit("editClose");
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$emit("editClose");
    }
  }
};
</script>

<style scoped lang="scss">
@import "~assets/styles/variable.scss";
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-indent: 40px;
    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }
  .wrap {
    padding: 20px;
  }
  .submit {
    float: left;
  }
}
</style>
