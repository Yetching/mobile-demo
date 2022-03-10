<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-text="返回" @click-left="onClickLeft" />

    <div class="img-wrap">
      <img
        src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png"
        alt=""
      />
    </div>
    <!-- 手机号注册 -->
    <van-cell-group v-if="false" inset>
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

    <!-- 账号密码登录 -->
    <van-cell-group inset>
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginForm.userName"
          name="userName"
          label="用户名"
          placeholder="请输入用户名"
        ></van-field>
        <van-field
          v-model="loginForm.password"
          type="password"
          name="password"
          label="密码"
          right-icon="warning-o"
          placeholder="请输入密码"
        ></van-field>
        <van-field
          v-model="loginForm.verify"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
        >
          <template #button>
            <VueImageVerify ref="verifyRef" />
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button round type="primary" block native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  import { Toast } from 'vant';

  import md5 from 'js-md5';

  import VueImageVerify from '@/components/VueImageVerify.vue';

  import { login } from '@/api/user';
  // ref<Nullable<HTMLElement>>(null)
  const verifyRef = ref<any>(null);
  const loginForm = reactive({
    userName: '',
    password: '',
    verify: '',
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
  const onSubmit = async (values: any) => {
    console.log(verifyRef.value.state.imgCode);
    if (
      verifyRef.value.state.imgCode.toLowerCase() !==
      loginForm.verify.toLowerCase()
    ) {
      Toast.fail('验证码错误');
      return;
    }
    const { data } = await login({
      loginName: values.userName,
      passwordMd5: md5(values.password),
    });

    localStorage.setItem('token', data);

    // 需要刷新页面，否则 axios.js 文件里的 token 不会被重置
    window.location.href = '/';
  };

  // 校验规则
  const fromRules = {
    phone: [{}],
    code: [],
  };
</script>

<style lang="less" scoped>
  .login-btn-wrap {
    padding: 20px 16px;
  }

  .img-wrap > img {
    margin: 60px 127.5px;
    width: 120px;
    height: 120px;
  }
</style>
