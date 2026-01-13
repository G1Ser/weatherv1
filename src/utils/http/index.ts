import axios, { type AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import Toast from '../toast';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_AMAP_API,
  timeout: 10000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Toast.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  // 成功回调
  res => {
    const { status, data } = res;
    if (status === 200) {
      return data;
    } else {
      Toast.error('请求失败');
      return Promise.reject('请求失败');
    }
  },
  // 错误回调（添加这个）
  (error: AxiosError) => {
    // 超时处理
    if (error.code === 'ECONNABORTED') {
      Toast.error('网络波动，请稍后重试');
    }
    // 网络错误
    else if (!error.response) {
      Toast.error('网络连接失败');
    }
    // HTTP错误
    else {
      Toast.error('请求失败');
    }

    return Promise.reject(error);
  }
);

// 创建类型声明，使http直接返回响应数据而不是AxiosResponse
function http<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  return axiosInstance(config) as unknown as Promise<T>;
}

export default http;
