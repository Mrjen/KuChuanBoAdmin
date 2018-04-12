<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" 
               :toggleClick="toggleSideBar" 
               :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    
    <div class="right-menu">

    <el-select v-model="currentApplet" 
               @change="changeApplet($event)"  
               filterable 
               placeholder="请选择">
        <el-option
          v-for="(item,idx) in appList"
          :key="item.value"
          :value-key="item.nick_name"
          :label="item.label"  
          :value="item.value">
        </el-option>
      </el-select>
  </div>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>总览</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import api from '../../../api/apiUrl';
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data(){
     return {
        appList:[],
        currentApplet:'小程序总览'
     }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  async mounted(){
      let appList = await axios.get(api.getApplets,{
      params:{
         sign:this.myGobel.sign
      }
    })
    console.log('appList 小程序列表',appList.data.data.applets)
    let _appList = appList.data.data.applets;
        _appList.map(el=>{
           el.value = el.oa_id;
           el.label = el.nick_name;
        })
    
    if(sessionStorage.getItem('currentApplet')){
      let ao_id = sessionStorage.getItem('currentApplet');
      console.log('ao_id',ao_id)
      for(let i=0,len=_appList.length;i<len;i++){
         if(ao_id == _appList[i].oa_id){
             this.currentApplet = _appList[i].label;
             this.myGobel.currentAppletName = _appList[i].label;
             break;
         }
      }
    }
    this.appList = _appList;
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    // 切换小程序
    changeApplet(value){
      console.log(this.myGobel)
      console.log('切换小程序了',value)
      this.myGobel.currentApplet = value;
      sessionStorage.setItem('currentApplet', value);
      location.reload();
    }
  },
  created(){
     console.log('created执行了')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  // .screenfull {
  //   position: absolute;
  //   right: 90px;
  //   top: 16px;
  //   color: red;
  // }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}

.right-menu {
    float: right;
    height: 100%;
    margin-right: 120px;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

