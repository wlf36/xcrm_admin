<template>
  <div class="container">
    <div class="wrap">
      <el-button-group>
        <el-button type="primary" @click="handleSetData('week')">周数据</el-button>
        <el-button type="primary" @click="handleSetData('month')">月数据</el-button>
        <el-button type="primary" @click="handleSetData('quarter')">季度数据</el-button>
        <el-button type="primary" @click="handleSetData('year')">年数据</el-button>
      </el-button-group>
      <el-row style="margin-top:30px;">
        <el-col :md="6" :sm="12">
          <pie-chart :chart-title="chartTitle.visit" :chart-data="pieChartData.visit"/>
        </el-col>
        <el-col :md="6" :sm="12">
          <pie-chart :chart-title="chartTitle.last_visit" :chart-data="pieChartData.last_visit"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="6" :sm="12">
          <pie-chart :chart-title="chartTitle.order" :chart-data="pieChartData.order"/>
        </el-col>
        <el-col :md="6" :sm="12">
          <pie-chart :chart-title="chartTitle.last_order" :chart-data="pieChartData.last_order"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import customer from "@/lin/models/customer";
import PieChart from "./components/PieChart";

export default {
  components: {
    PieChart
  },
  data() {
    return {
      pieChartData: [],
      ChartData: [],
      chartTitle: {
        order: "本周预约",
        visit: "本周到诊",
        last_order: "上周预约",
        last_visit: "上周到诊"
      }
    };
  },
  async mounted() {
    await this._getTotalById();
    this.pieChartData = {
      order: this.ChartData.this_week.order,
      visit: this.ChartData.this_week.visit,
      last_order: this.ChartData.last_week.order,
      last_visit: this.ChartData.last_week.visit
    };
  },
  methods: {
    handleSetData(data) {
      if (data == "week") {
        this.pieChartData = {
          order: this.ChartData.this_week.order,
          visit: this.ChartData.this_week.visit,
          last_order: this.ChartData.last_week.order,
          last_visit: this.ChartData.last_week.visit
        };
        this.chartTitle = {
          order: "本周预约",
          visit: "本周到诊",
          last_order: "上周预约",
          last_visit: "上周到诊"
        };
      }
      if (data == "month") {
        this.pieChartData = {
          order: this.ChartData.this_month.order,
          visit: this.ChartData.this_month.visit,
          last_order: this.ChartData.last_month.order,
          last_visit: this.ChartData.last_month.visit
        };
        this.chartTitle = {
          order: "本月预约",
          visit: "本月到诊",
          last_order: "上月预约",
          last_visit: "上月到诊"
        };
      }
      if (data == "quarter") {
        this.pieChartData = {
          order: this.ChartData.this_quarter.order,
          visit: this.ChartData.this_quarter.visit,
          last_order: this.ChartData.last_quarter.order,
          last_visit: this.ChartData.last_quarter.visit
        };
        this.chartTitle = {
          order: "本季度预约",
          visit: "本季度到诊",
          last_order: "上季度预约",
          last_visit: "上季度到诊"
        };
      }
      if (data == "year") {
        this.pieChartData = {
          order: this.ChartData.this_year.order,
          visit: this.ChartData.this_year.visit,
          last_order: [],
          last_visit: []
        };
        this.chartTitle = {
          order: "本年预约",
          visit: "本年到诊",
          last_order: "",
          last_visit: ""
        };
      }
    },
    async _getTotalById() {
      this.ChartData = await customer.totalById();
      console.log(this.ChartData);
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
