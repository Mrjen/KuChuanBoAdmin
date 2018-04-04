<template>
  <div id="c12" ref="c12"></div>
</template>

<script>
import G2 from "@antv/g2";
import { View, DataSet } from '@antv/data-set';
const dv = new View();
export default {
  name:'g2line',
  data() {
    return {
      chart:null,
      chartWidth:null
    };
  },
  props: {
    charData: {
      type: Array,
      default: function(){
        return [
            { date: "2017-01-11", newuser: 123, visituser:212 }, 
            { date: "2017-01-12", newuser: 246, visituser:352 },
            { date: "2017-01-13", newuser: 259, visituser:421 },
            { date: "2017-01-14", newuser: 321, visituser:212 },
            { date: "2017-01-15", newuser: 432, visituser:358 },
            { date: "2017-01-16", newuser: 540, visituser:123 }
          ]
      }
    },
    id: String
  },
  mounted: function() {
    //   this.drawChart();       // 第一步想到的是创建的时候更新图表，但是这个不适用于异步请求接口获取相关数据，所以采用下面的监听的方式
  },
  beforeUpdate: function() {
    //      this.drawChart();
  },
  watch: {
    charData: function(val, oldVal) {
      // 监听charData，当放生变化时，触发这个回调函数绘制图表
      console.log('new:', val, 'old:', oldVal)
      this.drawChart(val);
    }
  },
  mounted() {
    this.chartWidth = parseFloat(getComputedStyle(this.$refs.c12).width);
    this.drawChart(this.charData);
  },
  created() {},
  methods: {
    drawChart: function(datas) {
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      console.log('datas',datas)
      if(!datas) return false;
      this.chartWidth = parseFloat(getComputedStyle(this.$refs.c12).width);
      this.chart && this.chart.destroy();
      const ds = new DataSet();
      const dv = ds.createView().source(datas);
      dv.transform({
        type:'fold',
        fields:['newuser','visituser'],
        key:'user',
        value:'usernum'
      })

      this.chart = new G2.Chart({
        container: this.$refs.c12, // 指定图表容器 ID
        width: this.chartWidth, // 指定图表宽度
        forceFit: true, //宽度自适应
        height: 300 // 指定图表高度
      })
      this.chart.tooltip({
          crosshairs:{
            type:'line'
          }
      })
console.log('dv',dv)
      this.chart.source(dv,{
         usernum:{
            range:[0,1]
         }
      });

      this.chart.axis('user',{
        label:{
          formatter:val=>{
            console.log(val)
             return '用户';
          }
        }
      })
      this.chart.legend({
          marker:'square',
          
      })
      this.chart.line()
                .position('date*usernum')
                // .label('usernum')
                .color('user')
                .shape('smooth')
                .size(2);
      this.chart.point()
                .position('date*usernum')
                .size(4)
                .color('user')
                .shape('circle')
                .style({stroke:'#fff',lineWidth:2})
      this.chart.render()
    }
  }
};
</script>

<style>

</style>
