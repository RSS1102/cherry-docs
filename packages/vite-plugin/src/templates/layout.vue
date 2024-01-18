<template>
  <Head></Head>
  <div class="pages-content">
    <router-view />
  </div>
  <div>
    bar
  </div>
</template>

<script setup lang="ts">
import Head from './components/Head.vue';
</script>