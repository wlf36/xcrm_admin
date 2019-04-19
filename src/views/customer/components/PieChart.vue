<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "350px"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    },
    chartTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(this.chartTitle, val);
      }
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartTitle, this.chartData);
    },
    setOptions(name, data) {
      this.chart.setOption({
        title: {
          text: name,
          textStyle: {
            color: "#555"
          },
          textAlign: "left"
        },
        series: {
          radius: "55%",
          type: "pie",
          label: {
            normal: {
              show: true,
              formatter: "{b}\n{c}({d}%)"
            }
          },
          data: data
        }
      });
    }
  }
};
</script>