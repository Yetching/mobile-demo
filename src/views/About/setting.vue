<template>
  <van-nav-bar title="账号管理" left-icon="left" />
  <van-cell-group inset>
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.nickName"
        name="userName"
        label="昵称"
      ></van-field>
      <van-field
        v-model="formData.introduceSign"
        name="password"
        label="个性签名"
      ></van-field>
      <van-field v-model="formData.password" center clearable label="修改密码">
      </van-field>
      <div class="login-btn-wrap">
        <van-button round type="primary" block native-type="submit"
          >保存</van-button
        >
        <van-button round type="primary" block @click="logout"
          >退出登录</van-button
        >
      </div>
    </van-form>
  </van-cell-group>
</template>

<script setup lang="ts">
  import { getUserInfo } from '@/api/user';
  import { onMounted, reactive } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const formData = reactive({
    nickName: '',
    introduceSign: '',
    password: '',
  });

  onMounted(async () => {
    const { data } = await getUserInfo();
    formData.nickName = data.nickName;
    formData.introduceSign = data.introduceSign;
  });
</script>

<style lang="less" scoped>
  .login-btn-wrap {
    padding: 10px 20px;
    button {
      margin: 20px auto;
    }
  }
</style>
