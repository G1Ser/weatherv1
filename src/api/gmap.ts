import http from '@/utils/http';
import type { IpLocationResponseType, GeocodeResponseType, WeatherResponseType } from '@/types/gmap';

/**
 * @description IP定位
 */
export const getIpLocation = () => {
  return http<IpLocationResponseType>({
    url: '/ip',
    method: 'get',
  });
};

/**
 * @description 地理编码
 * @param address - 搜索地址名称，支持：省、市、区县、街道、门牌号、地名等
 */
export const getGeocode = (address: string) => {
  return http<GeocodeResponseType>({
    url: '/geocode',
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
    url: '/weather',
    method: 'get',
    params: {
      city: adcode,
      extensions,
    },
  });
};
