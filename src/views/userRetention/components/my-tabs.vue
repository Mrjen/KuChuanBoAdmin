<template>
  <ul class="my-tabs">
    <li class="tabs-item" 
        v-for="(item,idx) in tabsNav"
        :class="item.active?'active':''"
        @click="changeChart(idx)">
        {{item.text}}
    </li>
</ul>
</template>

<script>
export default {
  name: 'myTabs',
  data() {
    return {}
  },
  props: {
    tabsNav: {
      type: Array,
      default: function() {
        return [{
          active: true,
          text: '新增用户',
          type: 'visit_uv_new'
        }, {
          active: false,
          text: '活跃用户',
          type: 'visit_uv'
        }]
      }
    }
  },
  methods: {
    changeChart(idx) {
      const tabsNav = this.tabsNav;
      tabsNav.map(el => {
        el.active = false;
      })
      tabsNav[idx].active = true; 
      this.tabsNav = tabsNav;
      this.$emit('changeMyTabs', this.tabsNav[idx].type, idx)
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
