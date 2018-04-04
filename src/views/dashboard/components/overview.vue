<template>
<div class="app_detail_overview">
    <h4>昨日概况</h4>
  <ul class="overview">
       <li class="item">
          <p class="title">打开次数</p>
          <p class="item-data">18336</p>
          <p class="day data-p">
                <label>日</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
          <p class="week data-p">
                <label>周</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
          <p class="month data-p">
                <label>月</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
       </li>
       <li class="item">
          <p class="title">打开次数</p>
          <p class="item-data">18336</p>
          <p class="day data-p">
                <label>日</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
          <p class="week data-p">
                <label>周</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
          <p class="month data-p">
                <label>月</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
       </li>
       <li class="item">
          <p class="title">打开次数</p>
          <p class="item-data">18336</p>
          <p class="day data-p">
                <label>日</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
          <p class="week data-p">
                <label>周</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
          <p class="month data-p">
                <label>月</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
       </li>
       <li class="item">
          <p class="title">打开次数</p>
          <p class="item-data">18336</p>
          <p class="day data-p">
                <label>日</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
          <p class="week data-p">
                <label>周</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
          <p class="month data-p">
                <label>月</label>
                <span class="mini_tips success">+4.59%</span>
          </p>
       </li>
      
    </ul>
</div>
</template>

<script>
export default {
  name:'overview',
  data(){
    return {
        
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
   border:1px solid rgba(230, 230, 230, .8);
   padding: 20px 30px 30px;
   border-radius: 4px;
   h4 {
        font-weight: 400;
        font-size: 20px;
        display: inline-block;
        margin:0 20px 15px 0;
        padding: 0;
    }
}
.overview{
    display: flex;
    width: 100%;
    list-style: none;
    li{
        flex:1;
        text-align: center;
        .data-p{
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 1.6;
            margin:5px 0;
            label{
                width: 30px;
                color: #9a9a9a;
            }
            .mini_tips{
                font-size: 14px;
            }
            .success{
                color: #1aad19;
            }
        }
        .title{
            color: #9a9a9a;
        }
        .item-data{
           padding-top: 5px;
           font-size: 24px;
           min-height: 28px;
        }
    }
}
</style>
