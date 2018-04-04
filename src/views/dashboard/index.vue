<template>
  <div class="dashboard-container">
    <Overview></Overview>
    <ul class="tag-nav">
       <li v-for="(item,idx) in tagNav"
           :key="item.id"
           @click="changeData(idx)"
           :class="item.active?'tag-active':''">{{item.text}}</li>
    </ul>
    <div class="chart">
        <g2-line :charData="serverData"></g2-line>
    </div>
    
    <!-- <div class="dashboard-text">name:{{name}}45454545</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Overview from './components/overview';
import G2Line from './components/g2Line';

export default {
  name: 'dashboard',
  data() {
    return {
      serverData: null,
      c1: 'c12',
      tagNav:[{
        active:true,
        text:'今天',
        id:1
      },{
        active:false,
        text:'昨天',
        id:2
      },{
        active:false,
        text:'最近7天',
        id:3
      },{
        active:false,
        text:'最近30天',
        id:4
      }]
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
    Overview
  },
  created() {
    setTimeout(() => {
      this.serverData = [{ date: "2017-01-11", newuser: 123, visituser:212 }, 
            { date: "2017-01-12", newuser: 246, visituser:352 },
            { date: "2017-01-13", newuser: 259, visituser:421 },
            { date: "2017-01-14", newuser: 321, visituser:212 },
            { date: "2017-01-15", newuser: 432, visituser:358 },
            { date: "2017-01-16", newuser: 540, visituser:123 },
            { date: "2017-01-17", newuser: 540, visituser:123 },
            { date: "2017-01-18", newuser: 540, visituser:123 },
            { date: "2017-01-19", newuser: 540, visituser:123 },
            { date: "2017-01-20", newuser: 540, visituser:123 },
            { date: "2017-01-21", newuser: 540, visituser:123 },
            { date: "2017-01-22", newuser: 540, visituser:123 },
            { date: "2017-01-23", newuser: 540, visituser:123 },
            { date: "2017-01-24", newuser: 540, visituser:123 },
            { date: "2017-01-25", newuser: 540, visituser:123 },
            { date: "2017-01-26", newuser: 540, visituser:123 },
            { date: "2017-01-27", newuser: 540, visituser:123 }]
    }, 100)
  },
  methods:{
    changeData(idx){
       let tagNav = this.tagNav;
       tagNav.map(el=>{
         el.active = false;
       })
       tagNav[idx].active = true;
       this.tagNav = tagNav;
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
  border-radius: 0 0 4px 4px;
  border-top: none;
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

</style>
