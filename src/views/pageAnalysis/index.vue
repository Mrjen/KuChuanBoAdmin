<template>
  <div class="page-aly">
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
     
     <el-table :data="tableData"
                border
                style="width: 100%"
               :default-sort = "{prop: 'page', order: 'descending'}">
        <el-table-column prop="page"
                        label="页面URL"
                        sortable
                        fixed
                        min-width="110">
        </el-table-column>
        <el-table-column
              prop="name"
              label="页面名称"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="visit_user"
              label="访问人数"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="visit_num"
              label="访问次数"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="drop_out"
              label="退出页次数"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="drop_out_rate"
              label="退出率"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="average_duration"
              label="次均时长"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="share_time"
              label="分享次数"
              sortable
              border
              min-width="110">
        </el-table-column>
  </el-table>
  </div>
</template>

<script>
import tagTab from './components/tab-tag';
export default {
  name: 'pageAnalysis',
  data() {
    return {
        tableData: [{
          page: 'pages/index/index',
          name: '首页',
          visit_user: 16,
          visit_num:12,
          drop_out:28,
          drop_out_rate:'23%',
          average_duration:'00:30:24',
          share_time:2
        }, {
          page: 'pages/index/index',
          name: '首页',
          visit_user: 16,
          visit_num:12,
          drop_out:28,
          drop_out_rate:'23%',
          average_duration:'00:30:24',
          share_time:2
        }, {
          page: 'pages/index/index',
          name: '首页',
          visit_user: 16,
          visit_num:12,
          drop_out:28,
          drop_out_rate:'23%',
          average_duration:'00:30:24',
          share_time:2
        }, {
          page: 'pages/index/index',
          name: '首页',
          visit_user: 16,
          visit_num:12,
          drop_out:28,
          drop_out_rate:'23%',
          average_duration:'00:30:24',
          share_time:2
        }],
      selectDate:null
    }
  },
  components:{
    tagTab
  },
  methods:{
    changeNavData(data){
       console.log('这里请求数据从新加载',data)
    }
  }
}
</script>

<style lang="less" scoped>
.page-aly{
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
