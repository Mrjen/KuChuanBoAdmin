<template>
  <div id='circle' ref='circle'></div>
</template>

<script>
import G2 from '@antv/g2';
import { View, DataSet } from '@antv/data-set';
const dv = new View();
export default {
  name: 'circleChart',
  data() {
    return {
      chart: null,
      chartWidth: null
    }
  },
  props: {
    chartData: {
      type: Array,
      default: function() {
        return [{ name: '事例一', count: 40 },
          { name: '事例二', count: 21 },
          { name: '事例三', count: 17 },
          { name: '事例四', count: 13 },
          { name: '事例五', count: 9 }]
      }
    }
  },
  mounted() {
    // this.chartWidth = parseFloat(getComputedStyle(this.$refs.c12).width);
    this.drawChart(this.chartData);
  },
  watch: {
    chartData: function(val, oldVal) {
      // 监听chartData，当放生变化时，触发这个回调函数绘制图表
      // console.log('new:', val, 'old:', oldVal);
      this.drawChart(val);
    }
  },
  methods: {
    drawChart(datas) {
      if (!datas) return false;
      this.chart && this.chart.destroy();
      dv.source(datas).transform({
        type: 'percent',
        field: 'count',
        dimension: 'name',
        as: 'percent'
      });
      this.chart = new G2.Chart({
        container: this.$refs.circle, // 指定图表容器 ID
        width: 500, // 指定图表宽度
        forceFit: true, //宽度自适应
        height: 400 // 指定图表高度
      }),
      this.chart.source(dv, {
        percent: {
          formatter: val => {
            val = (val * 100) + '%';
            return val;
          }
        }
      });
      this.chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      this.chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      this.chart.guide().html({
        position: ['50%', '50%'],
        html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">男女<br><span style="color:#8c8c8c;font-size:20px">性别</span>分布</div>',
        alignX: 'middle',
        alignY: 'middle'
      });
      const interval = this.chart.intervalStack()
        .position('percent')
        .color('name')
        .label('percent', {
          formatter: (val, name) => {
            return name.point.name + ': ' + val;
          }
        })
        .tooltip('name*percent', (name, percent) => {
          percent = percent * 100 + '%';
          return {
            name: name,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
      this.chart.render();
      interval.setSelected(dv.rows[0]);
    }
  }
}
</script>

<style>

</style>
