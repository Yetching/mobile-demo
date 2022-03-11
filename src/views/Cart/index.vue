<template>
  <div class="cart-container">
    <van-nav-bar title="购物车"></van-nav-bar>

    <van-submit-bar
      class="submit-all"
      :price="3050"
      button-text="结算"
      button-color="#00c8c8"
      @submit="onSubmit"
    >
      <van-checkbox v-model="state.checkAll">全选</van-checkbox>
    </van-submit-bar>

    <div class="empty-wrap" v-if="!state.cartList.length">
      <img src="https://s.yezgea02.com/1604028375097/empty-car.png" />
      <span>购物车空空如也</span>
      <van-button round block type="primary" @click="goTo">前往选购</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const state = reactive({
    cartList: [] as any,
    checkAll: false,
  });

  const goTo = () => {
    router.push('/home');
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };
</script>

<style lang="less" scoped>
  .cart-container {
    .submit-all {
      margin-bottom: 50px;
    }
    .empty-wrap {
      display: flex;
      width: 50%;
      margin: 0 auto;
      margin-top: 50%;
      flex-direction: column;
      align-items: center;
      font-size: 16px;

      img {
        width: 150px;
        margin-bottom: 20px;
      }
      span {
        margin-bottom: 20px;
      }
    }
  }
</style>
