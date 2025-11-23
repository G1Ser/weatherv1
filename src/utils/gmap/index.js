import { getGeocode, getWeather } from '@/api/gmap';
import { getWeatherIcon } from '@/utils/weather-icon';

const getLocationGeocode = async (location) => {
  const res = await getGeocode(location);
  return res.geocodes[0].adcode;
};

const getLocationWeather = async (location, extensions = 'base') => {
  const adcode = await getLocationGeocode(location);
  const res = await getWeather(adcode, extensions);
  return res;
};

const formatWeatherCasts = (casts) => {
  const time = new Date();
  const hour = time.getHours();
  const weeksMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return casts.map((cast, _index) => {
    const dates = cast.date.split('-');
    const weather = hour >= 6 && hour < 18 ? cast.dayweather : cast.nightweather;
    const getWeek = () => {
      if (_index === 0) return '今天';
      else if (_index === 1) return '明天';
      else return weeksMap[cast.week % 7];
    };
    return {
      date: dates[1] + '/' + dates[2],
      week: getWeek(),
      weather,
      icon: getWeatherIcon(weather),
      maxTemp: cast.daytemp,
      minTemp: cast.nighttemp,
    };
  });
};

export { getLocationGeocode, getLocationWeather, formatWeatherCasts };
