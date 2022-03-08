<template>
  <div class="home">
    home
    <div class="vant-show">
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <div class="pxtorem">测试px to rem效果</div>

    <div class="icon-test">
      测试iconfont图标
      <div>
        <i class="iconfont icon-add-circle"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'HomeView',
    components: {},
  });
</script>

<style scoped lang="less">
  .pxtorem {
    width: 375px;
    height: 100px;
    background-color: antiquewhite;
    color: #000;
  }
  .icon-test {
    font-size: 75px;
  }
</style>
