<template>
  <div class="about-container">
    <van-nav-bar title="我的" left-text="返回" />
    <van-skeleton title avatar :row="3" :loading="loading">
      <div class="info-wrap">
        <van-image
          class="info-img"
          round
          width="60px"
          height="60px"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="info-list">
          <span>昵称：{{ user.nickName }}</span>
          <span>登录名：{{ user.loginName }}</span>
          <span>个性签名：{{ user.introduceSign }}</span>
        </div>
      </div>
    </van-skeleton>

    <van-cell
      :title="item.name"
      is-link
      v-for="item in cells"
      :key="item.name"
      @click="goTo(item.path)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { getUserInfo } from '@/api/user';
  import { onMounted, reactive, toRefs } from 'vue';

  const router = useRouter();
  const state = reactive({
    user: {} as any,
    loading: true,
  });

  onMounted(async () => {
    const { data } = await getUserInfo().catch((e) => {
      console.log(e.message);
      return {
        data: '',
      };
    });

    state.user = data;

    state.loading = false;
  });

  const { user, loading } = toRefs(state);

  // 功能项
  const cells = [
    {
      name: '我的订单',
      path: '/order',
    },
    {
      name: '账号管理',
      path: '/setting',
    },
    {
      name: '地址管理',
      path: '/address',
    },
    {
      name: '关于我们',
      path: '/aboutUs',
    },
  ];
  // 路由跳转
  const goTo = (path: string) => {
    router.push(path);
  };
</script>

<style lang="less" scoped>
  .about-container {
    .info-wrap {
      color: #fff;
      background-color: #00c8c8;
      margin: 10px 10px;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      padding: 20px 20px;
      box-shadow: 0 2px 5px #269090;
      .info-list {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        span {
          padding: 2px 0;
        }
      }
    }
  }
</style>
