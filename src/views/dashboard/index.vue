<template>
  <div class="dashboard-container">
    
    <Overview :Statistics="Statistics"></Overview>

    <tagNav class="date-tab" 
                @changeNavData="changeNavData">
    </tagNav>
    <div class="chart">
        <h4>趋势图</h4>
        <g2-line :charData="serverData"></g2-line>
    </div>
    
    <!-- <div class="dashboard-text">name:{{name}}45454545</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import Overview from './components/overview';
import G2Line from './components/g2Line';
import { yesterdayOverview } from '../../api/dashboard';
import api from '../../api/apiUrl';
import tagNav from '../pageAnalysis/components/tab-tag'

export default {
  name: 'dashboard',
  data() {
    return {
      serverData: null,
      Statistics:{},
      appList:[]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components: {
    G2Line,
    Overview,
    tagNav
  },
  async created() {
    // 获取chart数据
    this.getChartDate(-1).then(res => {
      this.serverData = res.data.data.statistics;
    });  
  },
  async mounted() {
    // 获取昨日概况
    const json = await axios.get(api.yesterdayOverview, {
      params: {
        id: 0,
        sign: this.myGobel.sign
      }
    })
    this.Statistics = json.data.data.Statistics[0];
  },
  methods: {
    // 切换昨天、7天、30天
    async changeNavData(data) {
      this.getChartDate(data).then(res=>{
        this.serverData = res.data.data.statistics;
      });
    },
    // 获取昨天、7天、30数据
    async getChartDate(time) {
      const Data = await axios.get(api.TrendLineChart,{
        params: {
          sign: this.myGobel.sign,
          oa_id: sessionStorage.getItem('currentApplet'),
          time: time
        }
      })
      return Data;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
*{
  list-style: none;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.chart{
  border:1px solid rgba(230, 230, 230, 0.8);
  border-radius: 4px;
  padding-top: 20px;
  h4{
    font-weight: lighter;
    padding-left: 40px;
  }
}

.tag-nav{
  width: 100%;
  display: flex;
  height: 60px;
  border:1px solid rgba(230, 230, 230, 0.8);
  border-radius: 4px 4px 0 0;
  border-bottom: none;
  margin-bottom: 0;
  li{
    padding: 0 20px;
    line-height: 60px;
    font-size: 14px;
    cursor: pointer;
  }
  .tag-active{
    color: #409EFF;
    font-weight: bold;
  }
}

.date-tab{
    width: 100%;
    height: 50px;
    border:1px solid rgba(230, 230, 230, 0.8);
    border-radius: 0 0 4px 4px;
    margin:0 0 30px 0;
  }

</style>
