import getWeatherIcon from '@/utils/weather-icon';

describe('getWeatherIcon', () => {
    it('应该返回 sun 当天气为晴天', () => {
        expect(getWeatherIcon('晴')).toBe('sun');
    });

    it('应该返回 cloudy 当天气为多云', () => {
        expect(getWeatherIcon('多云')).toBe('cloudy');
    });

    it('应该返回 rain 当天气为大雨', () => {
        expect(getWeatherIcon('大雨')).toBe('rain');
    });

    it('应该返回 thunderstorm 当天气为雷阵雨', () => {
        expect(getWeatherIcon('雷阵雨')).toBe('thunderstorm');
    });

    it('应该返回 unknown 当天气未知', () => {
        expect(getWeatherIcon('不存在的天气')).toBe('unknown');
    });

    it('应该返回 fog 当天气为雾霾', () => {
        expect(getWeatherIcon('霾')).toBe('fog');
    });
});