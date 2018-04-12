<template>
<div class="app_detail_overview">
   <h4>昨日概况</h4>
  <ul class="overview">
      <li>
         <p class="title">
               新用户数
               <el-tooltip class="item" 
                           effect="dark" 
                           content="Bottom Center" 
                           placement="bottom">
                           <div slot="content">
                                 首次访问小程序页面的用户数，
                                 <br/>同一用户多次访问不重复计；
                           </div>
                           <span class="doubt">?</span>
               </el-tooltip>
         </p>
         <p class="yestoday-num">{{Statistics.visit_uv_new}}</p>
      </li>
      <li>
         <p class="title">
               访问人数
               <el-tooltip class="item" 
                           effect="dark" 
                           content="Bottom Center" 
                           placement="bottom">
                           <div slot="content">
                                 访问小程序内所有页面的总用户数，
                                 <br/>同一用户多次访问不重复计；
                           </div>
                           <span class="doubt">?</span>
               </el-tooltip>
         </p>
         <p class="yestoday-num">{{Statistics.visit_uv}}</p>
      </li>
      <li>
         <p class="title">
               访问次数
               <el-tooltip class="item" 
                           effect="dark" 
                           content="Bottom Center" 
                           placement="bottom">
                           <div slot="content">
                                 访问小程序内所有页面总次数，<br/>多
                                 个页面之间跳转、同一页面的重复<br/>
                                 访问计为多次访问；
                           </div>
                           <span class="doubt">?</span>
               </el-tooltip>
         </p>
         <p class="yestoday-num">{{Statistics.visit_pv}}</p>
      </li>
      <li>
         <p class="title">
               打开次数
               <el-tooltip class="item" 
                           effect="dark" 
                           content="Bottom Center" 
                           placement="bottom">
                           <div slot="content">
                                 打开小程序总次数，用户从打开小<br/>
                                 程序到主动关闭小程序或超时退出<br/>
                                 计为一次；
                           </div>
                           <span class="doubt">?</span>
               </el-tooltip>
         </p>
         <p class="yestoday-num">{{Statistics.session_cnt}}</p>
      </li>
      <li>
         <p class="title">
               次均停留时长
               <el-tooltip class="item" 
                           effect="dark" 
                           content="Bottom Center" 
                           placement="bottom">
                           <div slot="content">
                                 平均每次打开小程序停留在小程序<br/>
                                 页面的总时长，即小程序停留总时<br/>
                                 长/打开次数。
                           </div>
                           <span class="doubt">?</span>
               </el-tooltip>
         </p>
         <p class="yestoday-num">{{Statistics.time}}</p>
      </li>
      <li>
         <p class="title">
               跳出率
               <el-tooltip class="item" 
                           effect="dark" 
                           content="Bottom Center" 
                           placement="bottom">
                           <div slot="content">
                                 只浏览了一个页面便离开了网站的<br/>
                                 访问次数占总的访问次数的百分比。
                           </div>
                           <span class="doubt">?</span>
               </el-tooltip>
         </p>
         <p class="yestoday-num">{{Statistics.stay_time_uv}}</p>
      </li>
  </ul>
</div>
</template>

<script>
import secToTime from '../../../utils/comm';
export default {
  name:'overview',
  data(){
    return {
        
    }
  },
  props:{
      Statistics:{
          type:Object,
          default:function() {
                return {}
          }
      }
  },
  watch:{
      Statistics:function(val,old){
      //    console.log(val,old)
         val.time = secToTime(val.stay_time_uv)
      }  
  }
}
</script>

<style lang="less" scoped>
*{
    padding: 0;
    margin: 0;
}
.app_detail_overview{
      border:1px solid rgba(230, 230, 230, 0.8);
      padding: 20px 20px 40px 20px;
      margin-bottom: 20px;
      border-radius: 4px;
      h4{
            font-size: 20px;
            font-weight: normal;
            color: #353535;
      }
  .overview{
        display: flex;
        list-style: none;
        padding:20px 0 0 0;
        li{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
          p{
            height: 30px;
            text-align: center;
          }
        }
        .yestoday-num{
              font-size: 30px;
              font-weight: bold;
              color: #353535;
        }
        .doubt{
              border: 1px solid #999;
              color: #999;
              border-radius: 50%;
              width: 14px;
              height: 14px;
              font-size: 12px;
              line-height: 14px;
              display: inline-block;
              align-items: center;
              justify-content: center;
              cursor: help;
        }
  }
}
</style>
