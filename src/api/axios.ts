/**
 * 封装axios
 */

import axios from 'axios';
import router from '../router';

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? '//backend-api-01.newbee.ltd/api/v1'
      : '//backend-api-01.newbee.ltd/api/v1',

  withCredentials: true,
  headers: {
    token: localStorage.getItem('token') as string,
  },
});

// todo 这种一次性设置token的方式，使用router.push()并不会重置token
// todo 可以使用window.location.href刷新页面，我觉得需要改良

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

axiosInstance.interceptors.response.use(
  (res) => {
    if (typeof res.data !== 'object') {
      // Toast.fail('服务端异常');
      return Promise.reject(res);
    }

    if (res.data.resultCode != 200) {
      // if (res.data.message) Toast.fail(res.data.message);

      if (res.data.resultCode == 416) {
        router.push('/login');
      }
      if (res.data.data && window.location.hash == '#/login') {
        localStorage.setItem('token', res.data.data);
        (axiosInstance.defaults.headers as any)['token'] = res.data.data;
      }

      return Promise.reject(res.data);
    }

    return res.data;
  },
  (error) => {
    console.log('axios 请求出错');
    console.log(error.message);
  }
);

export default axiosInstance;
