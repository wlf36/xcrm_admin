<template>
  <div class="container">
    <div class="wrap">
      <panel-group :customer-data="customerData" @handleSetLineChartData="handleSetLineChartData"/>
      <line-chart :chart-data="lineChartData"/>
    </div>    
  </div>
</template>

<script>
import customer from "@/lin/models/customer";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import DateRangeUtil from "@/lin/utils/date";
import Config from "@/config/index";

export default {
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {       
      lineChartData: [],
      customerData: {},
    };
  },
  async created() { 
    this.getStatisticsCustomers(
      DateRangeUtil.getCurrentWeek()[0],
      DateRangeUtil.getCurrentWeek()[1]
    );
    this._getTotalByDate();
  },
  methods: {
    async _getTotalByDate() {
      this.customerData = await customer.totalByDate();
      // console.log(this.customerData);
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
