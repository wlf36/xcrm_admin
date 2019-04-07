<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="iconfont icon-huiyuanguanli"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text color">
            <span>今日到诊</span>
            <count-to :start-val="0" :end-val="customerData.this_day.visit" :duration="2600"/>
          </div>
          <div class="card-panel-text">
            <span>今日回访</span>
            <count-to :start-val="0" :end-val="customerData.this_day.reask" :duration="2600"/>
          </div>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span>今日咨询</span>
            <count-to :start-val="0" :end-val="customerData.this_day.create" :duration="2600"/>
          </div>
          <div class="card-panel-text">
            <span>今日预约</span>     
            <count-to :start-val="0" :end-val="customerData.this_day.order" :duration="2600"/>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('thisWeek')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="iconfont icon-huiyuanguanli"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text color">
            <span>本周到诊</span>
            <count-to :start-val="0" :end-val="customerData.this_week.visit" :duration="2600"/>
          </div>
          <div class="card-panel-text">
            <span>本周回访</span>     
            <count-to :start-val="0" :end-val="customerData.this_week.reask" :duration="2600"/>
          </div>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span>本周咨询</span>
            <count-to :start-val="0" :end-val="customerData.this_week.create" :duration="2600"/>
          </div>
          <div class="card-panel-text">
            <span>本周预约</span>     
            <count-to :start-val="0" :end-val="customerData.this_week.order" :duration="2600"/>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('thisMonth')">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="iconfont icon-huiyuanguanli"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text color">
            <span>本月到诊</span>
            <count-to :start-val="0" :end-val="customerData.this_month.visit" :duration="2600"/>
          </div>
          <div class="card-panel-text">
            <span>本月回访</span>     
            <count-to :start-val="0" :end-val="customerData.this_month.reask" :duration="2600"/>
          </div>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span>本月咨询</span>
            <count-to :start-val="0" :end-val="customerData.this_month.create" :duration="2600"/>
          </div>
          <div class="card-panel-text">
            <span>本月预约</span>     
            <count-to :start-val="0" :end-val="customerData.this_month.order" :duration="2600"/>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('thisYear')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="iconfont icon-huiyuanguanli"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text color">
            <span>年度到诊</span>
            <count-to :start-val="0" :end-val="customerData.this_year.visit" :duration="2600"/>
          </div>
          <div class="card-panel-text">
            <span>年度回访</span>     
            <count-to :start-val="0" :end-val="customerData.this_year.reask" :duration="2600"/>
          </div>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span>年度咨询</span>
            <count-to :start-val="0" :end-val="customerData.this_year.create" :duration="2600"/>
          </div>
          <div class="card-panel-text">
            <span>年度预约</span>     
            <count-to :start-val="0" :end-val="customerData.this_year.order" :duration="2600"/>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  props: {
    customerData: {
      type: Object,
      required: true
    }
  },
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .iconfont {
    font-size: 48px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
        margin-bottom: 12px;
      }
      .color {
        color:#f4516c;
      }
    }
  }
}
</style>
