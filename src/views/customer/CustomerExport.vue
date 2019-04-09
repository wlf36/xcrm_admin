<template>
  <div class="container">
    <div class="wrap">
      <panel-group :customer-data="customerData" @handleSetLineChartData="handleSetLineChartData"/>
      <line-chart :chart-data="lineChartData"/>
    </div>

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

    <div v-auth="['导入数据']">
      <div class="title">导入数据</div>
      <lin-1px></lin-1px>
      <div class="wrap">
        <el-upload
          class="upload-demo"
          :action="uploadExcelApi"
          :headers="headers"
          :auto-upload="true"
        >
          <el-button size="small" type="primary">点击上传excel文件</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import customer from "@/lin/models/customer";
import LinDatePicker from "@/base/date-picker/lin-date-picker";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import DateRangeUtil from "@/lin/utils/date";
import Config from "@/config/index";
import { getToken } from "@/lin/utils/cookie";

export default {
  components: {
    LinDatePicker,
    PanelGroup,
    LineChart
  },
  data() {
    return {
      headers: {
        Authorization: getToken("access_token")
      },
      uploadExcelApi: `${Config.baseUrl}/cms/upload/excel`,
      downloadLoading: false,
      status: null,
      searchStatus: "筛选客户",
      customer_status: ["预约", "到诊"],
      searchDate: [],
      tableData: [],
      lineChartData: [],
      statisticsDate: {
        thisWeek: DateRangeUtil.getCurrentWeek(),
        thisMonth: DateRangeUtil.getCurrentMonth(),
        thisSeason: DateRangeUtil.getCurrentSeason(),
        thisYear: DateRangeUtil.getCurrentYear()
      },
      customerData: {}
    };
  },
  async created() {
    // console.log(DateRangeUtil.getCurrentWeek(), '本周')
    // console.log(DateRangeUtil.getCurrentMonth(), '本月')
    // console.log(DateRangeUtil.getCurrentSeason(), '本季度')
    // console.log(DateRangeUtil.getCurrentYear(), '本年度')
    // console.log(DateRangeUtil.getPreviousWeek(), '上周')
    // console.log(DateRangeUtil.getPreviousMonth(), '上月')
    // console.log(DateRangeUtil.getPreviousSeason(), '上季度')
    // console.log(DateRangeUtil.getPreviousYear(), '上年度')
    console.log("token", getToken("access_token"));
    this.getStatisticsCustomers(
      DateRangeUtil.getCurrentWeek()[0],
      DateRangeUtil.getCurrentWeek()[1]
    );
    this._getTotalByDate();
    // this.customerData = {
    //   this_day: {
    //     create: 60,
    //     reask: 5,
    //     order: 20,
    //     visit: 16
    //   },
    //   this_week: {
    //     create: 160,
    //     reask: 55,
    //     order: 80,
    //     visit: 67
    //   },
    //   this_month: {
    //     create: 450,
    //     reask: 130,
    //     order: 289,
    //     visit: 223
    //   },
    //   this_year: {
    //     create: 512,
    //     reask: 159,
    //     order: 412,
    //     visit: 376
    //   }
    // };
  },
  methods: {
    async _getTotalByDate() {
      this.customerData = await customer.totalByDate();
      console.log(this.customerData);
    },
    async getStatisticsCustomers(start, end) {
      let res = await customer.statisticsCustomers({
        start,
        end
      });
      this.lineChartData = res;
    },
    handleSetLineChartData(type) {
      let start;
      let end;
      if (type == "thisWeek") {
        (start = DateRangeUtil.getCurrentWeek()[0]),
          (end = DateRangeUtil.getCurrentWeek()[1]);
      }
      if (type == "thisMonth") {
        (start = DateRangeUtil.getCurrentMonth()[0]),
          (end = DateRangeUtil.getCurrentMonth()[1]);
      }
      if (type == "thisYear") {
        (start = DateRangeUtil.getCurrentYear()[0]),
          (end = DateRangeUtil.getCurrentYear()[1]);
      }
      this.getStatisticsCustomers(start, end);
    },
    handleCommandStatus(status) {
      this.searchStatus = status[0];
      if (status[0] == "筛选客户") {
        this.status = null;
      }
      if (status[0] == "预约") {
        this.status = 0;
      }
      if (status[0] == "到诊") {
        this.status = 1;
      }
    },
    handleDateChange(date) {
      this.searchDate = date;
    },
    async getCustomers() {
      let res;
      try {
        res = await customer.exportCustomers({
          status: this.status,
          start: this.searchDate[0],
          end: this.searchDate[1]
        });
        let _data = res;
        console.log(res);
        _data.map(item => {
          if (item.status == 0) {
            item.status = "未到";
          }
          if (item.status == 1) {
            item.status = "已到";
          }
        });
        this.tableData = _data;
      } catch (e) {
        console.log(e);
      }
    },
    handleReset() {
      this.status = null;
      this.searchDate = null;
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
        console.log(data, "111");
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
