<template>
  <Head />
  <div class="pages-content">
    <SideBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Head from './components/Head.vue';
import SideBar from './components/SideBar.vue';
</script>

<style scoped lang="scss">
.pages-content {
  display: flex;
}
</style>