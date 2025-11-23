import axios from 'axios';

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

function http(config) {
  return axiosInstance(config);
}

export default http;
