<template>
   <div class="map-div">
      <ve-map :data="chartData" 
              :settings="chartSettings"
              :colors="mapColors"
              ></ve-map>
   </div>
</template>

<script>
import axios from 'axios'
import api from '../../../api/apiUrl';
import mapTitle from 'echarts/lib/component/title';
import echarts from 'echarts/lib/echarts';

echarts.registerTheme('dark', {
  categoryAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false }
  },
  valueAxis: {
    axisLine: { show: false }
  },
  line: {
    smooth: true
  },
  grid: {
    containLabel: true,
    left: 10,
    right: 10
  }
})

export default {
  name: "mapChart",
  data() {
    return {
      chartData: {
        columns: ['城市', '人数'],
        rows: []
      },
      mapColors: ['#e9a574', '#f2637b', '#dc81d2', '#975fe4', '#9e8bef', '#3aa0ff', '#87d1e9', '#36cbcb', '#81debe', '#4ecb73', '#abde81'],
      initOptions: {
        theme: 'vintage'
      }
    };
  },
  components: {
 
  },
  props: {
    mapData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  watch: {
    mapData: function(val, old) {
      console.log('地图数据变化了11')
      console.log('val', val, 'old', old)
      this.chartData.rows = val;
      console.log('1111', this.chartData)
    }
  },
  created: function() {
    this.chartData = {
      columns: ["城市", "人数"],
      rows: []
    };
    this.chartSettings = {
      position: "china",
      dimension: "城市",
      metrics: ["人数"],
      dataType: {
        面积: "KMB"
      },
      itemStyle: {
        normal: {
          borderColor: '#fff',
          areaColor:['#b2e2ff'],
          color: '#f2637b'
        }
      }
    };
  },
  mounted() {
  
  },
  methods: {

  }
};
</script>

<style>

</style>
