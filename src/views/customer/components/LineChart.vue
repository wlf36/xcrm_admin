<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    // if (this.autoResize) {
    //   this.__resizeHandler = debounce(() => {
    //     if (this.chart) {
    //       this.chart.resize()
    //     }
    //   }, 100)
    //   window.addEventListener('resize', this.__resizeHandler)
    // }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    _list(key, data){
      let _data = []
      data.map((item) => { 
        _data.push(item[key])
      })
      return _data
    },    
    setOptions( data ) {      
      this.chart.setOption({
        xAxis: {
          data: this._list('date', data),
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['预约', '到诊', '咨询', '回访']
        },
        series: [{
          name: '预约', itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'bar',
          data: this._list('order', data),
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '到诊',
          smooth: true,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: this._list('visit', data),
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '咨询',
          smooth: true,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#009900',
              lineStyle: {
                color: '#009900',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: this._list('create', data),
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '回访',
          smooth: true,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#FF6600',
              lineStyle: {
                color: '#FF6600',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: this._list('reask', data),
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
