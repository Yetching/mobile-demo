<template>
  <van-nav-bar title="账号管理" left-arrow @click-left="onClickLeft" />
  <van-cell-group inset>
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.nickName"
        name="nickName"
        label="昵称"
      ></van-field>
      <van-field
        v-model="formData.introduceSign"
        name="introduceSign"
        label="个性签名"
      ></van-field>
      <van-field
        v-model="formData.password"
        name="password"
        center
        clearable
        label="修改密码"
      >
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
  import { editUserInfo, getUserInfo } from '@/api/user';
  import md5 from 'js-md5';
  import { Toast } from 'vant';
  import { onMounted, reactive } from 'vue';

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const onSubmit = async (values: any) => {
    console.log(values);

    const params: any = {
      introduceSign: values.introduceSign,
      nickName: values.nickName,
    };

    if (values.password) {
      params.password = md5(values.password);
    }

    await editUserInfo(params);

    Toast.success('保存成功');
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

  const onClickLeft = () => {
    history.back();
  };
</script>

<style lang="less" scoped>
  .login-btn-wrap {
    padding: 10px 20px;
    button {
      margin: 20px auto;
    }
  }
</style>
