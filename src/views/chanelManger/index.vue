/* disabled eslint */

<template>
  <div class="chanl-manger block">
     <p class="table-title">基本数据</p>
     <div class="show-list">
        <el-checkbox-group v-model="optionsList">
            <el-checkbox v-for="(check,cIdx) in optionsAllList"                     :label="check" 
                         :key="cIdx"></el-checkbox>
        </el-checkbox-group>
     </div>
     <div class="table">
        <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
            <el-table-column prop="name" 
                            label="fruitName" 
                            fixed
                            width="180"></el-table-column>
            <el-table-column :key="idx" 
                             v-for="(item,idx) in optionsList"
                             prop="name" 
                             :label="item">

            </el-table-column>
        </el-table>
     </div>
  </div>
</template>

<script>
const defaultFormThead = ['渠道类型', '渠道类型']
export default {
  data() {
    return {
      checkListActive: [{
        text: '渠道类型',
        active: true
      }, {
        text: '渠道类型',
        active: false
      }, {
        text: '渠道类型',
        active: false
      }, {
        text: '渠道类型',
        active: false
      }, {
        text: '渠道类型',
        active: false
      }, {
        text: '渠道类型',
        active: false
      }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      optionsList: ['渠道类型', '小程序'],
      optionsAllList: ['渠道类型', '小程序', '渠道成本', '研发成本', '总出单', '新成交', '旧成交', '粉丝收益', '女性', '男性', '新用户', '老用户', '咨询']
    }
  },
  watch: {
    optionsList: function(val, oldVal) {
      // console.log('new: %s, old: %s', val, oldVal)
    }
  }
}
</script>

<style lang="less" scoped>
.chanl-manger {
  width: 90%;
  margin: 35px 0 0 25px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #e5e7e7;
  padding: 0;
  .table-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    margin: 0 0 30px 0;
    font-size: 16px;
    background: #f6f8f8;
  }
  .show-list {
    padding: 0 0 0 30px;
    margin-bottom: 30px;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0;
    margin-right: 30px;
  }
  .el-checkbox {
    margin-right: 30px;
    margin-bottom: 10px;
  }
  .table{
      padding:0 20px;
      margin-bottom: 50px;
  }
}
</style>
