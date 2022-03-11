<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
      <van-tabbar-item
        icon="shopping-cart-o"
        to="/cart"
        :badge="!count ? '' : count"
      >
        购物车</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/about">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const active = ref(0);

  const count = 1;
</script>

<style lang="less" scoped></style>
