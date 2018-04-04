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
     <g2line></g2line>
  </div>
</template>

<script>
import tagTab from '../pageAnalysis/components/tab-tag';
import g2line from './components/line-chart';
export default {
  name: 'userRetention',
  data() {
    return {
        selectDate:null
    }
  },
  components:{
    tagTab,
    g2line
  },
  methods:{
    changeNavData(data){
       console.log('这是另一个组件',data)
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
}
</style>
