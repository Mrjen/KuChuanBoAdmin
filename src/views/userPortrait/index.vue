<template>
 <div class="user-point">
   <!-- 性别及年龄分布 -->
   <mySection @selectUser="changeUser1" @selsectDate="changeDate1" title="性别及年龄分布">
      <div class="chart-div">
            <div class="circle-item item">
              <circleChart :chartData="userSexData"></circleChart>
            </div>
            <div class="column-item item">
                <columnChart :chartData="userAgeData"></columnChart>
            </div>
      </div>
   </mySection>

<!-- 地区分布 -->
   <mySection @selectUser="changeUser2" @selsectDate="changeDate2" title="地区分布">
      <div class="chart-div">
            <div class="circle-item item">
              <MapChart :mapData="provinceData"></MapChart>
            </div>
            <div class="column-item item">
                <horizontalChart :chartData="provinceDataMax"></horizontalChart>
            </div>
      </div>
   </mySection>

<!-- 终端分布 -->
  <mySection @selectUser="changeUser2" @selsectDate="changeDate2" title="终端分布">
      <div class="chart-div">
            <div class="circle-item item">
              <MapChart :mapData="provinceData"></MapChart>
            </div>
            <div class="column-item item">
                <horizontalChart :chartData="provinceDataMax"></horizontalChart>
            </div>
      </div>
   </mySection>

   
   
   
 </div>
</template>

<script>
import axios from 'axios';
import api from '../../api/apiUrl';
import tagTab from '../pageAnalysis/components/tab-tag';
import MapChart from './components/map-chart';
import myTabs from '../userRetention/components/my-tabs';
import mySection from './components/section';
import circleChart from './components/circle-chart';
import columnChart from './components/column-chart';
import { setInterval } from 'timers';
import horizontalChart from './components/horizontal-chart'
export default {
  name: 'userPortrait',
  data() {
    return {
      userSexData: [],                   // 用户性别分布
      userAgeData: [],                   // 用户年龄分布
      userType1: 'visit_uv_new',         // 默认用户类型
      userDate1: -1,                      // 默认请求昨天数据 图表01

      provinceData: [],
      userType2: 'visit_uv_new',         // 默认用户类型
      userDate2: -1,
      provinceDataMax: []
    }
  },
  components:{
    tagTab,
    MapChart,
    myTabs,
    mySection,
    circleChart,
    columnChart,
    horizontalChart
  },
  async created() {
    // section1
    const userSexData = await this._getData({ type: this.userType1, field: 'genders', time: this.userDate1 });
    const userAgeData = await this._getData({ type: this.userType1, field: 'ages', time: this.userDate1 });
    this.userSexData = this.formSex(userSexData.data.data);
    this.userAgeData = this.formAge(userAgeData.data.data);

    // section2
    const provinceData = await this._getData({ type: this.userType2, field: 'province', time: this.userDate2 });
    this.provinceData = this.fromProvince(provinceData.data.data)
    this.provinceDataMax = this.getArrayMax(this.provinceData)
  },
  methods: {
    changeMyTabs(type, idx) {
      console.log(type, idx)
    },
    // 性别修改用户类型
    async changeUser1(value) {
      // console.log('修改第1个用户类型', value)
      const userSexData = await this._getData({ type: value, field: 'genders', time: this.userDate1 });
      const userAgeData = await this._getData({ type: value, field: 'ages', time: this.userDate1 });
      this.userSexData = this.formSex(userSexData.data.data);
      this.userAgeData = this.formAge(userAgeData.data.data);
      this.userType1 = value;
    },
    async changeDate1(value) {
      // console.log('修改第1个日期类型', value)
      const userSexData = await this._getData({ type: this.userType1, field: 'genders', time: value });
      const userAgeData = await this._getData({ type: this.userType1, field: 'ages', time: value });
      this.userSexData = this.formSex(userSexData.data.data);
      this.userAgeData = this.formAge(userAgeData.data.data);
      this.userDate1 = value;
    },
    async changeUser2(value) {
      console.log('修改第2个用户类型', value)
      const provinceData = await this._getData({ type: value, field: 'province', time: this.userDate2 });
      this.provinceData = this.fromProvince(provinceData.data.data)
    },
    async changeDate2(value) {
      console.log('修改第2个日期类型', value)
      const provinceData = await this._getData({ type: this.userType2, field: 'province', time: value });
      this.provinceData = this.fromProvince(provinceData.data.data)
      this.provinceDataMax = this.getArrayMax(this.provinceData)
    },
    async _getData(data = { time: -1, type: 'visit_uv_new', field: 'genders' }) {
      const sexData = await axios.get(api.UserPortrait, {
        params: {
          sign: this.myGobel.sign,
          oa_id: sessionStorage.getItem('currentApplet'),
          time: data.time,
          type: data.type,
          field: data.field
        }
      })
      return sexData;
    },
    formSex(arr) {
      const arry = [];
      for (const key in arr) {
        arry.push({ 'count': arr[key] })
      }
      arry[0].name = '未知';
      arry[1].name = '男';
      arry[2].name = '女';
      return arry;
    },
    formAge(arr) {
      const arry = [];
      for (const key in arr) {
        arry.push({ 'count': arr[key] })
      }
      arry[0].name = '未知';
      arry[1].name = '17岁以下';
      arry[2].name = '18~24岁';
      arry[3].name = '25~29岁';
      arry[4].name = '30~39岁';
      arry[5].name = '40~49岁';
      arry[5].name = '50岁以上';
      return arry;
    },
    fromProvince(arr) {
      const arry = [];
      for (const key in arr) {
        arry.push({ 'value': arr[key], '人数': arr[key] })
      }
      arry[0].name = '未知';
      arry[1].name = '其他';
      arry[2].name = '北京';
      arry[3].name = '上海';
      arry[4].name = '天津';
      arry[5].name = '重庆';
      arry[6].name = '香港';
      arry[7].name = '澳门';
      arry[8].name = '河北';
      arry[9].name = '山西';
      arry[10].name = '内蒙古';
      arry[11].name = '辽宁';
      arry[12].name = '吉林';
      arry[13].name = '黑龙江';
      arry[14].name = '江苏';
      arry[15].name = '浙江';
      arry[16].name = '安徽';
      arry[17].name = '福建';
      arry[18].name = '江西';
      arry[19].name = '山东';
      arry[20].name = '河南';
      arry[21].name = '湖北';
      arry[22].name = '湖南';
      arry[23].name = '广东';
      arry[24].name = '广西';
      arry[25].name = '海南';
      arry[26].name = '四川';
      arry[27].name = '贵州';
      arry[28].name = '云南';
      arry[29].name = '西藏';
      arry[30].name = '陕西';
      arry[31].name = '甘肃';
      arry[32].name = '青海';
      arry[33].name = '宁夏';
      arry[34].name = '新疆';
      arry[35].name = '台湾';

      arry.map(el =>{
        el['城市'] = el.name
      })
      return arry;
    },
    getArrayMax(arr) {
      var Array_tmp = JSON.parse(JSON.stringify(arr))
      for (let n = 0; n < 10; n++) {
        for (let k = Array_tmp.length-1; k > 0; k--) {
          if (Array_tmp[k].value > Array_tmp[k-1].value) {
            var tmp = Array_tmp[k-1];
            Array_tmp[k-1] = Array_tmp[k];
            Array_tmp[k] = tmp;
          }
        }
      }
      // 返回数组
      return Array_tmp.splice(0, 10).reverse();
    }
  }
}
</script>

<style lang="less" scoped>
.user-point{
  margin: 30px;
  .section{
    background-color: #fff;
    border-radius: 4px;
    border:1px solid #ebebeb;
    padding: 20px 30px 30px;
    margin-bottom: 30px;
    .title{
      font-weight: 400;
      font-size: 20px;
      color: #444;
    }
  }
  .chart-div{
    display: flex;
    margin-top: 30px;
    .item{
      flex: 1;
    }
  }
  .sex-and-age{

  }
}
</style>
