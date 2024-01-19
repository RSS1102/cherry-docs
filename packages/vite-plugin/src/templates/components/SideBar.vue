<template>
  <div class="side-bar">
    123123
  </div>
  <!-- <div class="sidebar">
    <div class="sidebar-header">
      <img src={cherryConfig.logo} alt="logo" />
      <span>{cherryConfig.title}</span>
    </div>
    <div class="sidebar-content">
      <ul>
        <li v-for="item in cherryConfig.sideBar" :key="item.path">
          <router-link :to="item.path" exact>
            <span class="iconfont icon-{{ item.icon }}"></span>
            <span>{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import cherryConfig from 'cherryConfig'
</script>
<style scoped lang="scss">
.side-bar {
  width: 168px;
}
</style>