<template>
  About 默认页面

  <div class="goLogin">
    <van-button type="primary" @click="goToLogin"> 点击登录 </van-button>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };
</script>

<style lang="less" scoped></style>
