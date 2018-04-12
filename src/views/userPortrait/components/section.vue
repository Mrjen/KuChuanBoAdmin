<template>
  <section class="section">
     <h3 class="title">{{title}}</h3>
     <!-- 用户选择 -->
      <el-select v-model="value1" @change="selsectUser" placeholder="请选择">
        <el-option
          v-for="item in tabsNav"
          :key="item.type"
          :label="item.text"
          :value="item.type">
        </el-option>
      </el-select>
      <!-- time -->
      <el-select v-model="value2" @change="selsectDate" placeholder="请选择">
        <el-option
          v-for="item in dateNav"
          :key="item.id"
          :label="item.text"
          :value="item.id">
        </el-option>
      </el-select>
      <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'mySection',
  data() {
    return {
      value1: '新增用户',
      value2: '昨天'
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
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
    },
    dateNav: {
      type: Array,
      default: function() {
        return [{
          active: true,
          text: '昨天',
          id: -1
        }, {
          active: false,
          text: '最近7天',
          id: 7
        }, {
          active: false,
          text: '最近30天',
          id: 30
        }]
      }
    }
  },
  methods: {
    selsectUser(value) {
      // console.log('选择用户', value)
      this.$emit('selectUser', value)
    },
    selsectDate(value) {
      // console.log('选择时间', value)
      this.$emit('selsectDate', value)
    }
  }
}
</script>

<style>

</style>
