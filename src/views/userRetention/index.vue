<template>
  <div class="user-rete">
     <div class="date-select">
       <tagTab class="date-tab" 
             @changeNavData="changeNavData">
             <div class="date-picker">
                <el-date-picker
                          v-model="selectDate"
                          type="daterange"
                          size="small"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                </el-date-picker>
             </div>
       </tagTab>
     </div>
     <!-- <ul class="my-tabs">
        <li class="tabs-item" 
            v-for="(item,idx) in tabsNav"
            :class="item.active?'active':''"
            @click="changeChart(idx)">
            {{item.text}}
        </li>
     </ul> -->
    <myTabs @changeMyTabs="changeMyTabs"></myTabs>
    <div class="chart-div">
      <g2line :charData="userRetains"></g2line>
    </div>

   <div class="user_retains_tab">
        <ul class="table-header">
           <li v-for="header in tableHeader">{{header.text}}</li>
        </ul>
      <ul class="table-list" v-if="currentIdx===0?true:false">
          <li class="table-row" v-for="(cell,idx) in userRetainTable" :key="idx">
             <p class="date" :style="{ flex: 11 -cell.length }">{{cell.ref_date}}</p>
             <div class="cell-item">
                <p class="cell-p" v-for="(tabcell, index) in cell.visit_uv_new"  :key="index">{{tabcell.value/100 + '%'}}</p>
             </div>
          </li>
      </ul>
      <ul class="table-list" v-if="currentIdx===1?true:false">
          <li class="table-row" v-for="(cell,idx) in userRetainTable" :key="idx">
             <p class="date" :style="{ flex: 11 -cell.length }">{{cell.ref_date}}</p>
             <div class="cell-item">
                <p class="cell-p" v-for="(tabcell, index) in cell.visit_uv"  :key="index">{{tabcell.value/100 + '%'}}</p>
             </div>
          </li>
      </ul>
   </div>
     
  </div>
</template>

<script>
import axios from 'axios';
import api from '../../api/apiUrl';
import tagTab from '../pageAnalysis/components/tab-tag';
import g2line from './components/line-chart';
import myTabs from './components/my-tabs';
export default {
  name: 'userRetention',
  data() {
    return {
      selectDate: null,
      tabsNav: [{
        active: true,
        text: '新增用户',
        type: 'visit_uv_new'
      }, {
        active: false,
        text: '活跃用户',
        type: 'visit_uv'
      }],
      navId: -1, // 昨天、7天、30天的id
      currentIdx: 0,
      userRetains: [],
      userRetainTable: [{
        ref_date: 20180410,
        key: 0,
        value: 1235
      }],
      tableHeader: [{
        text: '日期',
        id: 1
      }, {
        text: '活跃用户',
        id: 1
      }, {
        text: '1天后',
        id: 1
      }, {
        text: '2天后',
        id: 1
      }, {
        text: '3天后',
        id: 1
      }, {
        text: '4天后',
        id: 1
      }, {
        text: '5天后',
        id: 1
      }, {
        text: '6天后',
        id: 1
      }, {
        text: '7天后',
        id: 1
      }, {
        text: '14天后',
        id: 1
      }, {
        text: '30天后',
        id: 1
      }]
    }
  },
  components:{
    tagTab,
    g2line,
    myTabs
  },
  created() {
    this.getUserRetain({
      oa_id: sessionStorage.getItem('currentApplet'),
      time: this.navId,
      type: 'visit_uv_new'
    }).then(res => {
      console.log('res1', res)
      this.userRetains = res.data.data.userRetains;
      const _userRetainTable = res.data.data.userRetainTable;
        this.userRetainTable = _userRetainTable;
        console.log('_userRetainTable', _userRetainTable)
    })
  },
  methods: {
    changeNavData(data) {
      this.navId = data;
      this.getUserRetain({
        oa_id: sessionStorage.getItem('currentApplet'),
        time: this.navId,
        type: this.tabsNav[this.currentIdx].type
      }).then(res => {
        this.userRetains = res.data.data.userRetains;
        this.userRetainTable = res.data.data.userRetainTable;
      })
    },

    // 切换新增用户、活跃用户
    changeMyTabs(type, idx) {
      // console.log('新增用户组件', type, idx)
      this.currentIdx = idx;
      this.getUserRetain({
        oa_id: sessionStorage.getItem('currentApplet'),
        time: this.navId,
        type: type
      }).then(res => {
        this.userRetains = res.data.data.userRetains;
        this.userRetainTable = res.data.data.userRetainTable;
      })
    },

    // 获取用户留存
    async getUserRetain(data = {}) {
      const UserRetain = await axios.get(api.UserRetain, {
        params: { sign: this.myGobel.sign, oa_id: data.oa_id, time: data.time, type: data.type }
      })
      return UserRetain;
    }
  }
}
</script>

<style lang="less" scoped>
.user-rete{
  margin:30px;
  .date-tab{
    width: 100%;
    height: 50px;
    border:1px solid rgba(230, 230, 230, 0.8);
    border-radius: 0 0 4px 4px;
    margin:0 0 30px 0;
  }
  .date-picker{
    margin-left: 10px;
  }
  .my-tabs{
    list-style: none;
    display: flex;
    width: 100%;
    height: 40px;
    padding: 0;
    background: #f5f7fa;
    line-height: 40px;
    border: 1px solid #e4e7ed;
    border-bottom: none;
    border-radius:4px 4px 0 0 ;
    margin: 0;
    li{
      width: 100px;
      text-align: center;
      cursor: pointer;
      border-right: 1px solid transparent;
    }
    li.active{
      color: #409EFF;
      background-color: #fff;
      border-right: 1px solid #e4e7ed;
    }
  }
  .chart-div{
    border:1px solid #e4e7ed;
    border-radius: 0 0 4px 4px;
    border-top: none;
    padding-top: 40px;
    margin-bottom: 30px;
  }
}

.user_retains_tab{
    // display: flex;
   .table-header{
     display: flex;
     list-style: none;
     text-align: center;
     border:1px solid #e4e7ed;
     margin: 0;
     padding: 0;
     li{
       min-width: 110px;
       flex: 1;
       line-height: 50px;
       border-right: 1px solid #ebeef5;
     }
   }
   .table-list{
     list-style: none;
     padding-left: 0;
     margin:0;
     .table-row{
        display: flex;
        min-width: 110px;
        border: 1px solid #ebeef5;
        box-sizing: border-box;
        border-top: none;
        height: 50px;
        margin: 0;
        width: 100%;
       p{
         min-width: 110px;
         padding: 0;
         line-height: 50px;
       }
       .date{
           margin: 0;
           text-align: center;
          //  flex: 1;
          //  border: 1px solid #ebeef5;
           border-top: none;
           width: 10%;
       }
       .kong{
         border:1px solid red;
         min-width: 100px;
       }
       .cell-item{
         line-height: 50px;
         margin: 0;
         text-align: center;
         display: flex;
         justify-content: flex-start;
         width: 100%;
         .cell-p{
           width: 10%;
           line-height: 50px;
           margin: 0;
           border-right: 1px solid #409EFF;
           background-color: #409EFF;
           color: #fff;
         }
       }
     }
     .table-row:hover{
       background-color: #ecf5ff;
     }
   }
}

</style>
