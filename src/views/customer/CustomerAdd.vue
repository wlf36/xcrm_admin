<template>
  <div class="container">
    <div class="title">
      <span v-if="!showEdit">新建客户</span>
      <span v-else>编辑客户</span>
      <span v-if="showEdit" class="back" @click="back">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
    </div>
    <lin-1px></lin-1px>
    <div class="wrap">
      <el-form :model="form" status-icon ref="form" label-width="100px">
        <el-row>
          <el-col :lg="6" :md="10" :sm="24" :xs="24">
            <el-form-item label="预约时间" prop="order_time">
              <el-date-picker
                v-model="form.order_time"
                type="datetime"
                value-format="yyyy-MM-dd HH-mm-ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="病种" prop="disease_id">
              <el-select v-model="form.disease_id" placeholder="请选择">
                <el-option
                  v-for="item in diseases"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预约科室" prop="depart_id">
              <el-select v-model="form.depart_id" placeholder="请选择">
                <el-option
                  v-for="item in departs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="渠道来源" prop="source_id">
              <el-select v-model="form.source_id" placeholder="请选择">
                <el-option
                  v-for="item in sources"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字" prop="keyword">
              <el-input v-model="form.keyword" placeholder="请填写关键字"></el-input>
            </el-form-item>
            <el-form-item label="来源地址" prop="source_url">
              <el-input v-model="form.source_url" placeholder="请填写来源地址"></el-input>
            </el-form-item>
            <el-form-item label="咨询时间" prop="chat_time">
              <el-date-picker
                v-model="form.chat_time"
                type="datetime"
                value-format="yyyy-MM-dd HH-mm-ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" size="medium" @click="submitForm('form')">提交数据</el-button>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="10" :sm="24" :xs="24">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="form.gender" :label="1">男</el-radio>
              <el-radio v-model="form.gender" :label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请填写年龄"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请填写手机号"></el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="wx_name">
              <el-input v-model="form.wx_name" placeholder="请填写微信号"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" placeholder="请填写地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="20" :sm="24" :xs="24">
            <el-form-item label="备注" prop="notes">
              <Tinymce :height="400" ref="editor" v-model="form.notes"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import customer from "@/lin/models/customer";
import Tinymce from "@/components/Tinymce";
import depart from "@/lin/models/depart";
import disease from "@/lin/models/disease";
import source from "@/lin/models/source";

export default {
  components: {
    Tinymce
  },
  props: {
    editCustomerID: {
      type: Number
    },
    showEdit: {
      type: Boolean
    }
  },
  data() {
    return {
      showEdit: false,
      form: {
        name: "",
        gender: 1,
        age: "",
        phone: "",
        wx_name: "",
        address: "",
        order_time: null,
        notes: "",
        depart_id: null,
        disease_id: null,
        source_id: null,
        source_url: "",
        keyword: "",
        chat_time: null,
      },
      departs: [],
      diseases: [],
      sources: []
    };
  },
  async mounted() {
    if (this.showEdit) {
      this.form = await customer.getCustomer(this.editCustomerID);
    }
  },
  async created() {
    this.getDeparts();
    this.getDiseases();
    this.getSources();
  },
  methods: {
    back() {
      this.$emit("editClose");
    },
    async getDeparts() {
      this.departs = await depart.getDeparts();
    },
    async getDiseases() {
      this.diseases = await disease.getDiseases();
    },
    async getSources() {
      this.sources = await source.getSources();
    },
    async submitForm(formName) {
      if (this.showEdit) {
        const resEdit = await customer.editCustomer(
          this.editCustomerID,
          this.form
        );
        if (resEdit.error_code === 0) {
          this.$message.success(`${resEdit.msg}`);
          this.$emit("editClose");
        }
      } else {
        const resAdd = await customer.addCustomer(this.form);
        if (resAdd.error_code === 0) {
          this.$message.success(`${resAdd.msg}`);
          this.resetForm(formName);
        }
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
  .el-radio {
    margin-right: 30px;
    width: auto !important;
  }
}
</style>



