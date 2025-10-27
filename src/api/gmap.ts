import http from '@/utils/http';
import type { IpLocationResponseType, GeocodeResponseType, WeatherResponseType } from '@/types/gmap';

// ip定位
export const getIpLocation = () => {
  return http<IpLocationResponseType>({
    url: '/ip',
    method: 'get',
    params: {
      ip: '127.0.0.1',
    },
  });
};

// 地理编码
export const getGeocode = (address: string) => {
  return http<GeocodeResponseType>({
    url: '/geocode/geo',
    method: 'get',
    params: {
      address,
    },
  });
};

/**
 * @description 天气查询
 * @param adcode 区域编码
 * @param extensions 气象类型 -base：实况天气 -all：预报天气
 */
export const getWeather = (adcode: string, extensions: 'base' | 'all' = 'base') => {
  return http<WeatherResponseType>({
    url: '/weather/weatherInfo',
    method: 'get',
    params: {
      city: adcode,
      extensions,
    },
  });
};
