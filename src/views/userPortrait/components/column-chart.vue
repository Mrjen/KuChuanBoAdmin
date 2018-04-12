<template>
  <div id='cloumn' ref='cloumn'></div>
</template>

<script>
import G2 from '@antv/g2';
import { View, DataSet } from '@antv/data-set';
const dv = new View();
export default {
  name: 'cloumnChart',
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
        return [{ name: '1951 年', count: 38 },
          { name: '1952 年', count: 52 },
          { name: '1956 年', count: 61 },
          { name: '1957 年', count: 145 },
          { name: '1958 年', count: 48 },
          { name: '1959 年', count: 38 },
          { name: '1960 年', count: 38 },
          { name: '1962 年', count: 38 }]
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
      // console.log('new:2222', val, 'old:', oldVal);
      this.drawChart(val);
    }
  },
  methods: {
    drawChart(datas) {
      if (!datas) return false;
      this.chart && this.chart.destroy();
      this.chart = new G2.Chart({
        container: this.$refs.cloumn, // 指定图表容器 ID
        width: 500, // 指定图表宽度
        forceFit: true, //宽度自适应
        height: 400 // 指定图表高度
      }),
      this.chart.source(datas);
      // this.chart.scale('count', {
      //   tickInterval: 20
      // });
      this.chart.interval().position('name*count');
      this.chart.render();
    }
  }
}
</script>

<style>

</style>
