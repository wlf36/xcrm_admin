<template>
  <div class="container">
    <div v-auth="['导出数据']">
      <div class="title">导出数据</div>
      <lin-1px></lin-1px>
      <div class="wrap">
        <el-row>
          <el-col :lg="16" :md="20" :sm="24" :xs="24">
            <div class="condition">
              <el-dropdown style="margin: 0 10px;" @command="handleCommandStatus">
                <el-button>
                  {{searchStatus}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="['筛选客户']">筛选客户</el-dropdown-item>
                  <el-dropdown-item
                    v-for="(status, index) in customer_status"
                    :key="index"
                    :command="[status]"
                  >{{status}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <lin-date-picker @dateChange="handleDateChange" ref="searchDate" class="date"></lin-date-picker>

              <el-button type="primary" @click="handleDownload">导出数据</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>    
  </div>
</template>

<script>
import customer from "@/lin/models/customer";
import LinDatePicker from "@/base/date-picker/lin-date-picker";
import DateRangeUtil from "@/lin/utils/date";
import Config from "@/config/index";
import { getToken } from "@/lin/utils/cookie";

export default {
  components: {
    LinDatePicker,
  },
  data() {
    return {      
      downloadLoading: false,
      status: null,
      searchStatus: "筛选客户",
      customer_status: ["预约", "到诊", "回访"],
      searchDate: [],
      tableData: [], 
    };
  },  
  methods: {   
    async getCustomers() {
      let res;
      try {
        res = await customer.exportCustomers({
          status: this.status,
          start: this.searchDate[0],
          end: this.searchDate[1]
        });        
        this.tableData = res;
      } catch (e) {
        console.log(e);
      }
    }, 
    handleCommandStatus(status) {
      this.searchStatus = status[0];
      if (status[0] == "筛选客户") {
        this.status = null;
      }
      if (status[0] == "预约") {
        this.status = 1;
      }
      if (status[0] == "到诊") {
        this.status = 2;
      }
      if (status[0] == "回访") {
        this.status = 3;
      }
    },
    handleDateChange(date) {
      this.searchDate = date;
    },
    async handleDownload() {
      this.downloadLoading = true;
      await this.getCustomers();
      import("@/vendor/Export2Excel").then(excel => {
        const list = this.tableData;
        const header = [
          "姓名",
          "预约时间",
          "到诊",
          "性别",
          "年龄",
          "手机",
          "地址",
          "提交时间"
        ];
        const filterVal = [
          "name",
          "order_time",
          "status",
          "gender",
          "age",
          "phone",
          "address",
          "create_time"
        ];
        const data = this.formatJson(filterVal, list);        
        excel.export_json_to_excel({
          header: header,
          data
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
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
    .condition {
      display: flex;
    }
    .el-button {
      margin-left: 15px;
    }
  }
}
</style>
