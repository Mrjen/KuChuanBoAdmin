<template>
  <div class="page-aly" ref="page-aly">
     <!-- <div class="date-select">
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
     </div> -->
     
     <el-table class="table-data" 
               :data="tableData"
               style="width: 100%"
               :height="windowInnerH"
               :default-sort = "{prop: 'page', order: 'descending'}">
        <el-table-column
              prop="page_name"
              label="页面名称"
              sortable
              fixed
              min-width="110">
        </el-table-column>
        <el-table-column prop="page_path"
                        label="页面URL"
                        sortable          
                        min-width="110">
        </el-table-column>
        
        <el-table-column
              prop="page_visit_uv"
              label="访问人数"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="page_visit_pv"
              label="访问次数"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="exitpage_pv"
              label="退出页次数"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="time"
              label="次均时长"
              sortable
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="page_share_pv"
              label="分享次数"
              sortable
              border
              min-width="110">
        </el-table-column>
        <el-table-column
              prop="page_share_uv"
              label="分享人数"
              sortable
              border
              min-width="110">
        </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios';
import tagTab from './components/tab-tag';
import api from '../../api/apiUrl';
import secToTime from '../../utils/comm';
export default {
  name: 'pageAnalysis',
  data() {
    return {
      tableData: [],
      selectDate: null,
      windowInnerH: 500
    }
  },
  components: {
    tagTab
  },
  created() {
    console.log('sessionStorage', sessionStorage.getItem('currentApplet'))
    this.getAppletPageData( sessionStorage.getItem('currentApplet'))
      .then(res => {
        this.tableData = res;
        console.log('res', res)
      })
    this.windowInnerH = window.innerHeight - 240;
  },
  methods: {
    changeNavData(data) {
      console.log('首页切换', data)
      this.getAppletPageData(data)
        .then(res => {
          console.log(res)
          this.tableData = res;
        })
    },
    // 获取小程序页面数据
    async getAppletPageData(oa_id) {
      const pageData = await axios.get(api.PageAnalysis, {
        params: { sign: this.myGobel.sign, oa_id: oa_id }
      })
      const _tableData = pageData.data.data.page;
      _tableData.map(el => {
        el.time = secToTime(el.page_staytime_pv);
      })
      return _tableData;
    }
  }
}
</script>

<style lang="less" scoped>
.page-aly{
  margin:30px;
  display: flex;
  flex-direction: column;
  .table-data{
    flex: 1;
    height: 100%;
  }
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
