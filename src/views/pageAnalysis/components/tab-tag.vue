<template>
  <ul class="tag-div">
      <li v-for="(item,idx) in tagNav"
          @click="changeNav(item.id,idx)"
          :key="item.id"
          :class="item.active?'active':''">
          {{item.text}}
      </li>
      <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "tagTab",
  data() {
    return {};
  },
  props: {
    tagNav: {
      type: Array,
      default: function() {
        return [{
            active: true,
            text: "今天",
            id: 1
          },{
            active: false,
            text: "昨天",
            id: 2
          },{
            active: false,
            text: "最近7天",
            id: 3
          },{
            active: false,
            text: "最近30天",
            id: 4
          }]
      }
    }
  },
  methods: {
    changeNav(id, idx) {
      let tagNav = this.tagNav;
      tagNav.map(el => {
        el.active = false;
      });
      tagNav[idx].active = true;
      this.tagNav = tagNav;
      this.$emit("changeNavData", id);
    }
  },
  watch: {
    key: function(val, oldVal) {
      console.log(val, oldVal);
    }
  },
  mounted() {
    let that = this;
  }
};
</script>

<style lang="less" scoped>
.tag-div {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  padding: 0;
  li {
    padding: 0 20px;
    font-size: 15px;
    cursor: pointer;
    font-weight: bolder;
    color: #909399;
  }
  li.active {
    font-weight: bolder;
    color: #409eff;
  }
}
</style>
