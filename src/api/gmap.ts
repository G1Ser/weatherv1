import http from '@/utils/http';
import type { IpLocationResponseType, GeocodeResponseType, WeatherResponseType } from '@/types/gmap';

/**
 * @description IP定位
 */
export const getIpLocation = (lon?: number, lat?: number) => {
  return http<IpLocationResponseType>({
    url: '/ip',
    method: 'get',
    params: {
      lon,
      lat,
    },
  });
};

/**
 * @description 地理编码
 * @param keyword - 搜索地址名称
 */
export const getGeocode = (keyword: string) => {
  return http<GeocodeResponseType>({
    url: '/geo/adcode',
    method: 'get',
    params: {
      keyword,
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
    url: '/amap/weather',
    method: 'get',
    params: {
      city: adcode,
      extensions,
    },
  });
};
