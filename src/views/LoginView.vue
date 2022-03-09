<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-text="返回" @click-left="onClickLeft" />

    <div class="img-wrap">
      <img
        src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png"
        alt=""
        width="120"
        height="120"
      />
    </div>
    <van-cell-group inset>
      <van-field
        v-model="loginForm.userName"
        left-icon="user-o"
        clearable
        placeholder="请输入手机号"
      />
      <van-field
        v-model="loginForm.password"
        clearable
        left-icon="music-o"
        placeholder="请输入验证码"
        center
      >
        <template #button>
          <van-button size="mini" type="primary" round @click="getAuthCode">
            发送验证码
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
      <van-button round type="primary" block @click="login">登录</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  import { Toast } from 'vant';

  const loginForm = reactive({
    userName: '',
    password: '',
  });

  const onClickLeft = () => {
    history.back();
    console.log('back to left');
  };

  const getAuthCode = () => {
    console.log('send authcode');
  };

  // 模拟异步请求
  const loginApi = () => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve('success');
        }, 5000);
      } catch (e: any) {
        reject(e.message);
      }
    });
  };

  // 登录按钮
  const login = () => {
    console.log('login');
    console.log(loginForm);

    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });

    loginApi().then((res) => {
      console.log(res);

      Toast.success('登录成功');
    });
  };

  // 校验规则
  const fromRules = {
    phone: [{}],
    code: [],
  };

  // toRefs(loginForm);
</script>

<style lang="less" scoped>
  .login-btn-wrap {
    padding: 20px 16px;
  }

  .img-wrap > img {
    margin: 60px 50%;
    transform: translateX(-50%);
  }
</style>
