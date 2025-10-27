import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { AppConfigType } from '@/types/config';

const axiosInstance = axios.create({
  baseURL: 'https://restapi.amap.com/v3',
  timeout: 10000,
});

const loadConfig = async () => {
  let appConfig: AppConfigType | null = null;
  const response = await fetch('/app.config.json');
  appConfig = await response.json();
  return appConfig;
};

// 请求拦截器
axiosInstance.interceptors.request.use(
  async config => {
    const cfg = await loadConfig();

    // 自动添加 key 参数
    if (cfg?.amapKey) {
      config.params = {
        ...config.params,
        key: cfg.amapKey,
      };
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(res => {
  const { status, data } = res;
  if (status === 200) {
    return data;
  } else {
    return Promise.reject('请求失败');
  }
});

// 创建类型声明，使http直接返回响应数据而不是AxiosResponse
function http<T = any>(config: AxiosRequestConfig): Promise<T> {
  return axiosInstance(config) as unknown as Promise<T>;
}

export default http;
