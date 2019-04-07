<template>
  <div class="container">
    <div class="title">新建科室</div>
    <lin-1px></lin-1px>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请填写名称"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入简介"
                v-model="form.description"
              ></el-input>
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
  data() {
    return {
      form: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    async submitForm(formName) {
      const res = await depart.addDepart(this.form);
      if (res.error_code === 0) {
        this.$message.success(`${res.msg}`);
        this.resetForm(formName);
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  }
  .wrap {
    padding: 20px;
  }
  .submit {
    float: left;
  }
}
</style>
