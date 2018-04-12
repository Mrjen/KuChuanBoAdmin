<template>
  <div id="hchart" ref="hchart"></div>
</template>

<script>
import G2 from "@antv/g2";
import { View, DataSet } from '@antv/data-set';
export default {
  name: 'horizontalChart',
  data() {
    return {
      chart: null,
    }
  },
  props: {
    chartData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  watch: {
    chartData(val, old) {
      console.log('水平图表数据变化', val)
      this.drawChart(val)
    }
  },
  mounted() {
    this.drawChart(this.chartData)
  },
  methods: {
    drawChart(datas) {
      const ds = new DataSet();
      const dv = ds.createView().source(datas);
      dv.source(datas)
        .transform({
          type: 'sort',
          callback(a, b) { // 排序依据，和原生js的排序callback一致
            return a.population - b.population;
          }
        });
      this.chart && this.chart.destroy();
      console.log('this.$refs.hchart', this.$refs.hchart)
      this.chart = new G2.Chart({
        container: this.$refs.hchart,
        forceFit: true,
        height: 500
      });
      this.chart.source(dv);
      this.chart.axis('name', {
        label: {
          offset: 12
        }
      });
      this.chart.coord().transpose();
      this.chart.interval().position('name*value');
      this.chart.render();
    }
  }
}
</script>

<style>

</style>
