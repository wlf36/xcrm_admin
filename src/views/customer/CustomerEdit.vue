<template>
  <div class="container">
    <div class="title">
      <span>更新客户</span>
      <span class="back" @click="back">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
    </div>
    <lin-1px></lin-1px>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-input v-model="form.gender" placeholder></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请填写年龄"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请填写手机号"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" placeholder="请填写地址"></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="notes">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入备注信息"
                v-model="form.notes"
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
import customer from "@/lin/models/customer";

export default {
  props: {
    editCustomerID: {
      type: Number
    }
  },
  data() {
    return {
      form: {
        name: '',
        gender: '',
        age: '',
        phone: '',
        address: '',
        notes: ''
      }
    };
  },
  async mounted() {
    this.form = await customer.getCustomer(this.editCustomerID);
  },
  methods: {
    async submitForm() {
      const res = await customer.editCustomer(this.editCustomerID, this.form);
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
